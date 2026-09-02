import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import type { EditorProviderProps, JSONContent } from "@tiptap/react";
import { Provider } from "jotai";
import { forwardRef, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import tunnel from "tunnel-rat";
import { novelStore } from "../utils/store";
import { EditorCommandTunnelContext } from "./editor-command";

export interface EditorProps {
  readonly children: ReactNode;
  readonly className?: string;
}

interface EditorRootProps {
  readonly children: ReactNode;
}

export const EditorRoot: FC<EditorRootProps> = ({ children }) => {
  const tunnelInstance = useRef(tunnel()).current;

  return (
    <Provider store={novelStore}>
      <EditorCommandTunnelContext.Provider value={tunnelInstance}>{children}</EditorCommandTunnelContext.Provider>
    </Provider>
  );
};

export type EditorContentProps = Omit<EditorProviderProps, "content"> & {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly initialContent?: JSONContent;
};

// @tiptap/react's useEditor re-applies `editable: editor.isEditable` on every
// re-render instead of the latest `editable` prop, so toggling `editable`
// after mount has no effect unless we sync it imperatively. See
// https://github.com/ueberdosis/tiptap/issues (EditorProvider option sync).
const EditableSync: FC<{ editable?: boolean }> = ({ editable }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor && !editor.isDestroyed && typeof editable === "boolean" && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  return null;
};

export const EditorContent = forwardRef<HTMLDivElement, EditorContentProps>(
  ({ className, children, initialContent, ...rest }, ref) => (
    <div ref={ref} className={className}>
      <EditorProvider {...rest} content={initialContent}>
        <EditableSync editable={rest.editable} />
        {children}
      </EditorProvider>
    </div>
  ),
);

EditorContent.displayName = "EditorContent";
