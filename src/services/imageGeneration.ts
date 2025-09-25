export interface GenerationRequest {
  prompt: string;
  template?: string;
  imageFile?: File;
}

export interface ProfessionalTemplate {
  id: string;
  title: string;
  description: string;
  referenceImage: string;
  prompt: string;
  category: string;
}

export interface TemplateGenerationRequest {
  userPhoto: File;
  template: ProfessionalTemplate;
}

export interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

class ImageGenerationService {
  private apiKey: string;
  private geminiImageUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_NANO_BANAN_API_KEY;
    if (!this.apiKey) {
      console.warn('Gemini API key not configured - using demo mode');
    }
  }

  private get isApiConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data:image/jpeg;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  private buildPrompt(request: GenerationRequest): string {
    let finalPrompt = request.prompt;

    // Add template-specific enhancements
    switch (request.template) {
      case 'therapy-session':
        finalPrompt = `Create a warm and professional therapeutic environment. ${finalPrompt}. Style: soft lighting, comfortable seating, calming colors, professional psychology office setting, realistic.`;
        break;
      case 'mindfulness':
        finalPrompt = `Create a peaceful mindfulness scene. ${finalPrompt}. Style: serene, natural lighting, meditation-focused, calm atmosphere, zen-like, peaceful.`;
        break;
      case 'emotions':
        finalPrompt = `Create a visual representation of emotions. ${finalPrompt}. Style: abstract or symbolic, emotionally evocative, psychology-oriented, meaningful imagery.`;
        break;
      case 'nature-therapy':
        finalPrompt = `Create a natural therapeutic environment. ${finalPrompt}. Style: outdoor therapy setting, connection with nature, healing environment, natural light.`;
        break;
      default:
        finalPrompt = `Create a professional psychology-related image. ${finalPrompt}. Style: professional, therapeutic, appropriate for mental health context.`;
    }

    return finalPrompt;
  }

  // New method for professional template generation
  async generateWithTemplate(request: TemplateGenerationRequest): Promise<GenerationResponse> {
    try {
      console.log('Generating professional image with template:', request.template.title);

      // Check if API is configured, fallback to demo mode
      if (!this.isApiConfigured) {
        console.log('API not configured, returning demo image');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
          success: true,
          imageUrl: this.generateDemoImage({
            prompt: request.template.prompt,
            template: request.template.category
          })
        };
      }

      // Convert user photo to base64
      const userPhotoBase64 = await this.fileToBase64(request.userPhoto);
      
      // Use the optimized NanoBanana prompt directly from template
      const enhancedPrompt = request.template.prompt;
      
      const requestBody = {
        contents: [{
          parts: [
            // First: the user's photo
            {
              inline_data: {
                mime_type: request.userPhoto.type,
                data: userPhotoBase64
              }
            },
            // Second: the optimized NanoBanana prompt
            {
              text: enhancedPrompt
            }
          ]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.9,
          candidateCount: 1
        }
      };

      console.log('Calling Gemini 2.5 Flash Image API...');

      const response = await fetch(`${this.geminiImageUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('🔍 Full API Response:', JSON.stringify(data, null, 2));
      
      // More detailed response debugging
      if (data.candidates) {
        console.log('📋 Candidates found:', data.candidates.length);
        data.candidates.forEach((candidate, index) => {
          console.log(`🔍 Candidate ${index}:`, JSON.stringify(candidate, null, 2));
        });
      }
      
      // Extract the generated image - try different response formats
      if (data.candidates?.[0]?.content?.parts) {
        console.log('📋 Parts found:', data.candidates[0].content.parts.length);
        
        for (const part of data.candidates[0].content.parts) {
          console.log('🔍 Checking part:', JSON.stringify(part, null, 2));
          
          if (part.inline_data?.data || part.inlineData?.data) {
            const imageData = part.inline_data || part.inlineData;
            const mimeType = imageData.mime_type || imageData.mimeType || 'image/png';
            const imageUrl = `data:${mimeType};base64,${imageData.data}`;
            
            console.log('✅ Image generated successfully!');
            
            return {
              success: true,
              imageUrl
            };
          }
        }
      }

      // Check if there's text response instead
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log('📝 Text response found:', data.candidates[0].content.parts[0].text);
      }

      throw new Error(`No image data found in API response. Response structure: ${JSON.stringify(data, null, 2)}`);

    } catch (error) {
      console.error('Template generation error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Legacy method for backward compatibility
  async generateImage(request: GenerationRequest): Promise<GenerationResponse> {
    // For now, create demo image as fallback
    await new Promise(resolve => setTimeout(resolve, 2000));
    const demoImageUrl = this.generateDemoImage(request);
    
    return {
      success: true,
      imageUrl: demoImageUrl
    };
  }

  // Generate a demo image with enhanced text from Gemini
  private generateDemoImageWithText(request: GenerationRequest, enhancedText: string): string {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Cannot create canvas context');
    }
    
    // Create gradient background based on template
    let gradient;
    switch (request.template) {
      case 'therapy-session':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');
        break;
      case 'mindfulness':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#06b6d4');
        gradient.addColorStop(1, '#3b82f6');
        break;
      case 'emotions':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#ec4899');
        gradient.addColorStop(1, '#8b5cf6');
        break;
      case 'nature-therapy':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#06b6d4');
        break;
      default:
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(1, '#3b82f6');
    }
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some abstract shapes representing AI-enhanced content
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ffffff';
    
    // Multiple shapes to represent enhanced content
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * 400 + 50;
      const y = Math.random() * 400 + 50;
      const size = Math.random() * 60 + 30;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Add text overlay
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✨ AI-Enhanced', 256, 60);
    
    ctx.font = '14px Arial';
    ctx.fillText(request.template || 'Custom', 256, 85);
    
    // Add enhanced text preview (first few words)
    ctx.font = '12px Arial';
    ctx.globalAlpha = 0.7;
    const words = enhancedText.split(' ').slice(0, 12);
    const lines = this.wrapText(ctx, words.join(' '), 256, 450, 400, 16);
    
    lines.forEach((line, index) => {
      ctx.fillText(line, 256, 450 + (index * 16));
    });
    
    return canvas.toDataURL('image/png');
  }

  // Helper method to wrap text
  private wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
        if (lines.length >= 3) break; // Limit to 3 lines
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // Generate a placeholder image for demonstration (fallback)
  private generateDemoImage(request: GenerationRequest): string {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Cannot create canvas context');
    }
    
    // Create gradient background based on template
    let gradient;
    switch (request.template) {
      case 'therapy-session':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');
        break;
      case 'mindfulness':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#06b6d4');
        gradient.addColorStop(1, '#3b82f6');
        break;
      case 'emotions':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#ec4899');
        gradient.addColorStop(1, '#8b5cf6');
        break;
      case 'nature-therapy':
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#06b6d4');
        break;
      default:
        gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(1, '#3b82f6');
    }
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some abstract shapes
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#ffffff';
    
    // Circle
    ctx.beginPath();
    ctx.arc(150, 150, 80, 0, 2 * Math.PI);
    ctx.fill();
    
    // Rectangle
    ctx.fillRect(300, 200, 120, 120);
    
    // Triangle
    ctx.beginPath();
    ctx.moveTo(100, 400);
    ctx.lineTo(200, 300);
    ctx.lineTo(200, 400);
    ctx.fill();
    
    // Add text
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Demo Image', 256, 50);
    
    ctx.font = '16px Arial';
    ctx.fillText(request.template || 'Custom', 256, 80);
    
    // Add prompt preview
    ctx.font = '12px Arial';
    ctx.globalAlpha = 0.6;
    const words = request.prompt.split(' ').slice(0, 8);
    ctx.fillText(words.join(' ') + '...', 256, 470);
    
    return canvas.toDataURL('image/png');
  }

  async testConnection(): Promise<boolean> {
    try {
      const testResult = await this.generateImage({
        prompt: 'A simple test image of a blue circle on white background'
      });
      return testResult.success;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const imageGenerationService = new ImageGenerationService();