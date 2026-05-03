import { QRCodeSVG } from 'qrcode.react';
import { Share2, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

export default function StoreQRCode({ storeSlug, storeName }) {
  const [copied, setCopied] = useState(false);
  const storeUrl = `${window.location.origin}/store/${storeSlug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: storeName,
          text: `Check out my WhatsApp store: ${storeName}`,
          url: storeUrl,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      copyToClipboard();
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('store-qr-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${storeSlug}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="p-6 bg-white rounded-3xl shadow-xl border-4 border-[var(--brand-primary)]/10">
        <QRCodeSVG 
          id="store-qr-svg"
          value={storeUrl} 
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button variant="primary" className="w-full gap-2" onClick={handleShare}>
          <Share2 size={18} /> Share Store Link
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="gap-2" onClick={copyToClipboard}>
            {copied ? <Check size={18} /> : <Copy size={18} />} 
            Copy URL
          </Button>
          <Button variant="secondary" className="gap-2" onClick={downloadQR}>
            <Download size={18} /> Download QR
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-[var(--text-muted)] text-center max-w-[200px]">
        Customers can scan this code with their camera to visit your store instantly.
      </p>
    </div>
  );
}
