import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, Check, X, AlertCircle, Image as ImageIcon } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
  className?: string;
}

export function UploadZone({
  onFileSelect,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  maxSize = 10,
  className = ""
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progressMessages = [
    "Carregando...",
    "Processando...",
    "Quase pronto..."
  ];

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Formato não suportado. Use: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`;
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `Arquivo muito grande. Máximo: ${maxSize}MB`;
    }
    return null;
  };

  const handleFileSelect = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setErrorMessage(error);
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setErrorMessage("");

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload progress simulation
    for (let i = 0; i <= 100; i += 25) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    setUploadStatus('success');

    setTimeout(() => {
      onFileSelect(file);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    setSelectedImage(null);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getProgressMessage = () => {
    if (uploadProgress < 40) return progressMessages[0];
    if (uploadProgress < 80) return progressMessages[1];
    return progressMessages[2];
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'uploading': return 'border-blue-400/50 bg-blue-500/10';
      case 'success': return 'border-green-400/50 bg-green-500/10';
      case 'error': return 'border-red-400/50 bg-red-500/10';
      default: return isDragOver ? 'border-purple-400/50 bg-purple-500/10' : 'border-white/20 bg-white/5';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading': return <Upload className="h-8 w-8 text-blue-400 animate-bounce" />;
      case 'success': return <Check className="h-8 w-8 text-green-400" />;
      case 'error': return <AlertCircle className="h-8 w-8 text-red-400" />;
      default: return <Camera className="h-8 w-8 text-white/70" />;
    }
  };

  if (uploadStatus === 'success' && selectedImage) {
    return (
      <div className={`relative rounded-3xl overflow-hidden ${className}`}>
        <div className="bg-gradient-to-br from-green-500/15 to-emerald-500/15 backdrop-blur-md border border-green-400/20 rounded-3xl p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center">
              <Check className="h-8 w-8 text-green-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Imagem carregada!
              </h3>
              <p className="text-green-200/80">
                Sua foto está pronta para ser processada
              </p>
            </div>

            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-green-400/30">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetUpload}
              className="border-green-400/30 text-green-300 hover:bg-green-500/20 transition-colors duration-150"
            >
              <X className="h-3 w-3 mr-1" />
              Trocar imagem
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
        id="file-upload"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative overflow-hidden rounded-3xl border-2 border-dashed
          transition-all duration-300 backdrop-blur-md
          ${getStatusColor()}
          ${isDragOver ? 'scale-105 shadow-lg shadow-purple-500/20' : 'scale-100'}
          ${uploadStatus === 'idle' ? 'cursor-pointer hover:border-purple-400/50 hover:bg-purple-500/10' : ''}
        `}
        onClick={() => uploadStatus === 'idle' && fileInputRef.current?.click()}
      >

        <div className="p-12 text-center space-y-6">
          {/* Status icon */}
          <div className={`
            w-20 h-20 mx-auto rounded-full flex items-center justify-center
            transition-all duration-300
            ${uploadStatus === 'success' ? 'bg-green-500/20' :
              uploadStatus === 'error' ? 'bg-red-500/20' :
              uploadStatus === 'uploading' ? 'bg-blue-500/20' :
              'bg-gradient-to-r from-purple-500/20 to-pink-500/20'}
          `}>
            {getStatusIcon()}
          </div>

          {/* Status content */}
          {uploadStatus === 'idle' && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isDragOver ? "Solte sua foto aqui" : "Envie sua foto"}
              </h3>
              <p className="text-white/70 text-lg mb-6">
                Arraste e solte ou clique para selecionar
              </p>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3">
                Carregando...
              </h3>
              <p className="text-blue-200/80 mb-4">
                {getProgressMessage()}
              </p>
              <div className="relative">
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto h-3 rounded-full" />
              </div>
              <p className="text-blue-200/60 text-sm mt-3">
                {uploadProgress}%
              </p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-3">Ops! Algo deu errado</h3>
              <p className="text-red-200/80 mb-4">{errorMessage}</p>
              <Button
                variant="outline"
                onClick={resetUpload}
                className="border-red-400/30 text-red-300 hover:bg-red-500/20"
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {/* Requirements (only show when idle) */}
          {uploadStatus === 'idle' && (
            <div className="space-y-3 text-white/60 text-sm max-w-sm mx-auto">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Foto clara e bem iluminada</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Rosto visível e centralizado</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>JPG, PNG ou WebP até {maxSize}MB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}