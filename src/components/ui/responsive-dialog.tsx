import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

import { cn } from "@/lib/utils";
import React from "react";

type BaseProps = {
  children: React.ReactNode;
};

type RootResponsiveDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} & BaseProps;

type ResponsiveDialogProps = {
  className?: string;
  asChild?: true;
} & BaseProps;

const ResponsiveDialog = ({
  children,
  ...props
}: RootResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const ResponsiveDialog = isMobile ? Drawer : Dialog;

  return <ResponsiveDialog {...props}>{children}</ResponsiveDialog>;
};

const ResponsiveDialogTrigger = ({
  ref,
  className,
  children,
  ...props
}: ResponsiveDialogProps & { ref: React.RefObject<HTMLButtonElement> }) => {
  const { isMobile } = useMediaQuery();
  const Trigger = isMobile ? DrawerTrigger : DialogTrigger;

  return (
    <Trigger className={className} {...props} ref={ref}>
      {children}
    </Trigger>
  );
};
ResponsiveDialogTrigger.displayName = "ResponsiveDialogTrigger";

const ResponsiveDialogClose = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Close = isMobile ? DrawerClose : DialogClose;

  return (
    <Close className={className} {...props}>
      {children}
    </Close>
  );
};

const ResponsiveDialogContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerContent> &
  React.ComponentPropsWithoutRef<typeof DialogContent> & {
    ref?: React.RefObject<
      | React.ElementRef<typeof DrawerContent>
      | React.ElementRef<typeof DialogContent>
    >;
  }) => {
  const { isMobile } = useMediaQuery();
  const Content = isMobile ? DrawerContent : DialogContent;

  return (
    <Content className={className} {...props} ref={ref}>
      {children}
    </Content>
  );
};
ResponsiveDialogContent.displayName = "ResponsiveDialogContent";

const ResponsiveDialogDescription = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Description = isMobile ? DrawerDescription : DialogDescription;

  return (
    <Description className={className} {...props}>
      {children}
    </Description>
  );
};

const ResponsiveDialogHeader = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Header = isMobile ? DrawerHeader : DialogHeader;

  return (
    <Header className={className} {...props}>
      {children}
    </Header>
  );
};

const ResponsiveDialogTitle = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Title = isMobile ? DrawerTitle : DialogTitle;

  return (
    <Title className={className} {...props}>
      {children}
    </Title>
  );
};

const ResponsiveDialogBody = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const ResponsiveDialogFooter = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Footer = isMobile ? DrawerFooter : DialogFooter;

  return (
    <Footer className={className} {...props}>
      {children}
    </Footer>
  );
};

const ResponsiveDialogPortal = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Portal = isMobile ? DrawerPortal : DialogPortal;

  return <Portal {...props}>{children}</Portal>;
};

const ResponsiveDialogOverlay = ({
  className,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const { isMobile } = useMediaQuery();
  const Overlay = isMobile ? DrawerOverlay : DialogOverlay;

  return (
    <Overlay className={className} {...props}>
      {children}
    </Overlay>
  );
};

export {
  ResponsiveDialogOverlay,
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogPortal,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
};
