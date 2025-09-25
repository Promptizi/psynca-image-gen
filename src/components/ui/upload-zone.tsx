import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, Check, X, AlertCircle, Image as ImageIcon, Sparkles, Zap } from "lucide-react";

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
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progressMessages = [
    "Magia acontecendo... ✨",
    "Preparando sua transformação...",
    "Quase lá! Ficou incrível!"
  ];

  const encouragingMessages = [
    "Processando sua imagem...",
    "Aplicando transformações...",
    "Finalizando..."
  ];

  const [currentEncouragement, setCurrentEncouragement] = useState(0);

  useEffect(() => {
    if (uploadStatus === 'uploading') {
      const interval = setInterval(() => {
        setCurrentEncouragement(prev => (prev + 1) % encouragingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [uploadStatus]);

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

    // Upload progress simulation
    for (let i = 0; i <= 100; i += 25) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    // Call callback directly after upload
    onFileSelect(file);
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
      case 'uploading': return 'border-primary/50 bg-primary/5';
      case 'error': return 'border-destructive/50 bg-destructive/5';
      default: return isDragOver ? 'border-primary/50 bg-primary/10' : 'border-border/50 bg-card/30';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading': return (
        <div className="relative">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/20 rounded-full animate-ping" />
        </div>
      );
      case 'error': return <AlertCircle className="h-6 w-6 text-destructive animate-shake" />;
      default: return (
        <div className={`transition-all duration-300 ${
          isDragOver ? 'animate-celebration-bounce' : ''
        }`}>
          <Camera className={`h-6 w-6 transition-colors duration-300 ${
            isDragOver ? 'text-primary' : 'text-muted-foreground'
          }`} />
        </div>
      );
    }
  };


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
          relative overflow-hidden rounded-2xl border-2 border-dashed
          transition-all duration-300 backdrop-blur-md
          ${getStatusColor()}
          ${isDragOver ? 'scale-[1.02] shadow-card' : 'scale-100'}
          ${uploadStatus === 'idle' ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5' : ''}
        `}
        onClick={() => uploadStatus === 'idle' && fileInputRef.current?.click()}
      >

        <div className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
          {/* Magical sparkles for drag over */}
          {isDragOver && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-magic-sparkle" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-primary/60 rounded-full animate-magic-sparkle" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-6 left-8 w-1 h-1 bg-primary/40 rounded-full animate-magic-sparkle" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary/80 rounded-full animate-magic-sparkle" style={{ animationDelay: '1.5s' }} />
            </div>
          )}

          {/* Status icon */}
          <div className={`
            w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center
            transition-all duration-500 ease-out
            ${uploadStatus === 'error' ? 'bg-destructive/20 animate-shake' :
              uploadStatus === 'uploading' ? 'bg-primary/20 animate-pulse' :
              isDragOver ? 'bg-primary/20 scale-110 shadow-glow' : 'bg-primary/10'}
          `}>
            {getStatusIcon()}
          </div>

          {/* Status content */}
          {uploadStatus === 'idle' && (
            <div className="transition-all duration-300">
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 transition-all duration-300 ${
                isDragOver
                  ? 'text-primary scale-105'
                  : 'text-foreground'
              }`}>
                {isDragOver ? "Solte aqui" : "Envie sua foto"}
              </h3>
              <p className={`text-sm sm:text-base mb-3 sm:mb-4 transition-all duration-300 ${
                isDragOver
                  ? 'text-primary/80'
                  : 'text-muted-foreground'
              }`}>
                {isDragOver
                  ? "Sua transformação está prestes a começar!"
                  : "Arraste e solte ou clique para selecionar"}
              </p>
            </div>
          )}

          {uploadStatus === 'uploading' && (
            <div className="animate-slide-up">
              <h3 className="text-xl font-semibold text-foreground mb-2 animate-pulse">
                {getProgressMessage()}
              </h3>
              <p className="text-primary/80 mb-4 animate-fade-in">
                {encouragingMessages[currentEncouragement]}
              </p>
              <div className="relative mb-4">
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto h-3 rounded-full overflow-hidden" />
                {uploadProgress > 75 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-3 w-3 text-primary animate-bounce" />
                  </div>
                )}
              </div>
              <p className="text-foreground text-sm font-medium animate-heartbeat">
                {uploadProgress}% ✨
              </p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="animate-slide-up">
              <h3 className="text-xl font-semibold text-destructive mb-2">Erro no upload</h3>
              <p className="text-muted-foreground mb-4">{errorMessage}</p>
              <Button
                variant="outline"
                onClick={resetUpload}
                className="border-border/50 text-foreground hover:bg-card/50 hover:scale-105 transition-transform duration-200"
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {/* Requirements (only show when idle) */}
          {uploadStatus === 'idle' && (
            <div className={`space-y-2 text-sm max-w-sm mx-auto transition-all duration-300 ${
              isDragOver ? 'text-primary/60' : 'text-muted-foreground'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isDragOver ? 'bg-primary animate-pulse' : 'bg-primary'
                }`}></div>
                <span>Foto clara com rosto visível</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isDragOver ? 'bg-primary animate-pulse' : 'bg-primary'
                }`} style={{ animationDelay: '0.2s' }}></div>
                <span>JPG, PNG ou WebP até {maxSize}MB</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}