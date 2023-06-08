import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  portalId: string;
}

function withPortal<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  portalProps: PortalProps
) {
  return function PortalWrapper(props: P) {
    const { portalId } = portalProps;
    const [mounted, setMounted] = useState<boolean>(false);
    const portalContainerRef = useRef<Element | null>(null);

    useEffect(() => {
      setMounted(true);
      portalContainerRef.current =
        document.querySelector<HTMLElement>(portalId);
      console.log(portalId);
      return () => {
        portalContainerRef.current = null;
      };
    }, [portalId]);

    if (!portalContainerRef.current || !mounted) {
      return null;
    }

    return createPortal(
      <WrappedComponent {...props} />,
      portalContainerRef.current
    );
  };
}

export default withPortal;
