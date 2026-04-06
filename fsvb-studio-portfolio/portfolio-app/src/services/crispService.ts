import { useEffect } from 'react';

// Types Crisp - 🔥 FIX: Cohérent avec ContactPage.tsx
declare global {
  interface Window {
    $crisp: any; // Garder 'any' pour flexibilité max
    CRISP_WEBSITE_ID: string;
  }
}

interface CrispConfig {
  websiteId: string;
  userEmail?: string;
  userNickname?: string;
  userPhone?: string;
  customColors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
}

export const configureCrisp = (config: CrispConfig) => {
  // Configuration de base
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = config.websiteId;

  // Chargement du script Crisp
  const script = document.createElement('script');
  script.src = `https://client.crisp.chat/l.js`;
  script.async = true;
  document.head.appendChild(script);

  // Configuration utilisateur si fournie
  if (config.userEmail) {
    window.$crisp.push(['set', 'user:email', config.userEmail]);
  }
  if (config.userNickname) {
    window.$crisp.push(['set', 'user:nickname', config.userNickname]);
  }
  if (config.userPhone) {
    window.$crisp.push(['set', 'user:phone', config.userPhone]);
  }

  // Configuration des couleurs FSVB Studio
  if (config.customColors) {
    window.$crisp.push(['config', 'color:primary', config.customColors.primary || '#CFAE60']);
    window.$crisp.push(['config', 'color:text', config.customColors.text || '#FFFFFF']);
    window.$crisp.push(['config', 'color:background', config.customColors.background || '#14133F']);
  }
};

export const setUserEmail = (email: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:email', email]);
  }
};

export const setUserNickname = (nickname: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:nickname', nickname]);
  }
};

export const setUserPhone = (phone: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:phone', phone]);
  }
};

export const setUserTokenId = (tokenId: string) => {
  if (window.$crisp) {
    window.$crisp.push(['set', 'user:token', tokenId]);
  }
};

export const resetSession = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'session:reset']);
  }
};

export const openChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:open']);
  }
};

export const closeChat = () => {
  if (window.$crisp) {
    window.$crisp.push(['do', 'chat:close']);
  }
};

// Hook React pour initialiser Crisp
export const useCrisp = (config: CrispConfig) => {
  useEffect(() => {
    // Éviter la double initialisation
    if (window.$crisp && window.CRISP_WEBSITE_ID === config.websiteId) {
      return;
    }

    configureCrisp(config);

    // Cleanup
    return () => {
      if (window.$crisp) {
        window.$crisp.push(['do', 'chat:hide']);
      }
    };
  }, [config.websiteId]);
};

// Composant Crisp Chat
interface CrispChatProps {
  websiteId: string;
  userEmail?: string;
  userNickname?: string;
  userPhone?: string;
  userTokenId?: string;
}

export const CrispChat: React.FC<CrispChatProps> = ({
  websiteId,
  userEmail,
  userNickname,
  userPhone,
  userTokenId
}) => {
  useCrisp({
    websiteId,
    userEmail,
    userNickname,
    userPhone,
    customColors: {
      primary: '#CFAE60',     // Gold primary FSVB
      text: '#FFFFFF',        // Blanc
      background: '#14133F'   // Fond sombre FSVB
    }
  });

  // Définir l'ID utilisateur si fourni
  useEffect(() => {
    if (userTokenId && window.$crisp) {
      setUserTokenId(userTokenId);
    }
  }, [userTokenId]);

  return null; // Crisp se charge automatiquement
};

export default CrispChat;