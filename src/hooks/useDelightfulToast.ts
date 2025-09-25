import { useToast } from "@/hooks/use-toast";

const celebrationEmojis = ['🎉', '✨', '🎊', '🚀', '⭐', '🌟', '💫', '🎈', '🎆', '🎇'];
const successTitles = [
  'Fantástico!',
  'Incrível!',
  'Perfeito!',
  'Maravilhoso!',
  'Espetacular!',
  'Uau!',
  'Sensacional!',
  'Incrível!',
  'Show!'
];

export function useDelightfulToast() {
  const { toast } = useToast();

  const showCelebration = (title?: string, description?: string) => {
    const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
    const randomTitle = successTitles[Math.floor(Math.random() * successTitles.length)];

    toast({
      title: `${randomEmoji} ${title || randomTitle}`,
      description: description || "Sua criação ficou incrível! ✨",
      duration: 4000,
    });
  };

  const showSuccess = (title: string, description?: string) => {
    const randomEmoji = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];

    toast({
      title: `${randomEmoji} ${title}`,
      description: description,
      duration: 3000,
    });
  };

  const showEncouragement = (message?: string) => {
    const encouragingMessages = [
      "Você está arrasando! 🔥",
      "Criatividade em ação! ✨",
      "Essa vai ficar incrível! 🎨",
      "Sua visão está tomando forma! 🌟",
      "Arte digital em progresso! 🎯"
    ];

    const selectedMessage = message || encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

    toast({
      title: "🎪 " + selectedMessage,
      duration: 2500,
    });
  };

  return {
    showCelebration,
    showSuccess,
    showEncouragement,
    toast
  };
}