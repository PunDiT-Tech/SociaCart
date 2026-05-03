import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { updateProduct, uploadProductImage } from '../services/productService';
import AppShell from '../components/layout/AppShell';
import TopBar from '../components/layout/TopBar';
import PageWrapper from '../components/layout/PageWrapper';
import ProductForm from '../components/store/ProductForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        toast.error("Invalid product ID");
        navigate('/');
        return;
      }
      const docRef = doc(db, "products", productId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().user_id === user.uid) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Product not found or access denied");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, user.uid, navigate]);

  const handleSubmit = async (formData, imageFile) => {
    setSaving(true);
    try {
      let imageUrl = product.image_url;

      if (imageFile) {
        imageUrl = await uploadProductImage(user.uid, imageFile);
        setProgress(100);
      }

      await updateProduct(productId, {
        ...formData,
        image_url: imageUrl
      });

      toast.success("Product updated!");
      navigate('/');
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <AppShell showNav={false}>
      <TopBar title="Edit Product" />
      <PageWrapper>
        <div className="bg-[var(--surface-card)] rounded-[var(--radius-xl)] border border-[var(--border-default)] p-6 shadow-sm">
          <ProductForm 
            initialData={product}
            onSubmit={handleSubmit} 
            loading={saving}
            uploadProgress={progress}
          />
        </div>
      </PageWrapper>
    </AppShell>
  );
}
