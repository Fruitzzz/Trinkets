import { useCallback } from "react";
import {useTranslation} from "react-i18next";
export const useMessage = () => {
  const {t} = useTranslation();
  return useCallback((text) => {
    if(text) {
        window.M.toast({html: t(text)});
    }
  }, [t]);
};
