import React from 'react';
import { View } from 'react-native';
import { ContentContainerProps } from './ContentContainer.types';
import { getContentContainerStyles } from './ContentContainer.styles';

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  maxWidth = 600,
  centered = true,
}) => {
  const styles = getContentContainerStyles(maxWidth, centered);
  const childArray = React.Children.toArray(children);
  const textChildren = childArray.filter((child) => typeof child === 'string');
  const textPaths: string[] = [];
  const inspectNode = (node: React.ReactNode, path: string): void => {
    if (typeof node === 'string') {
      textPaths.push(`${path}:${node}`);
      return;
    }
    if (!React.isValidElement(node)) {
      return;
    }
    const typeName =
      typeof node.type === 'string'
        ? node.type
        : (node.type as { displayName?: string; name?: string })?.displayName ??
          (node.type as { name?: string })?.name ??
          'UnknownComponent';
    React.Children.forEach(node.props?.children, (child, index) => {
      inspectNode(child, `${path}>${typeName}[${index}]`);
    });
  };
  React.Children.forEach(children, (child, index) => inspectNode(child, `root[${index}]`));

  let strippedTextNodes = 0;
  const sanitizeChildren = (node: React.ReactNode, parentLooksLikeText: boolean): React.ReactNode => {
    if (typeof node === 'string') {
      const trimmed = node.trim();
      if (!parentLooksLikeText && (trimmed.length === 0 || trimmed === '.')) {
        strippedTextNodes += 1;
        return null;
      }
      return node;
    }

    if (!React.isValidElement(node)) {
      return node;
    }

    const typeName =
      typeof node.type === 'string'
        ? node.type
        : (node.type as { displayName?: string; name?: string })?.displayName ??
          (node.type as { name?: string })?.name ??
          '';
    const isTextLike = parentLooksLikeText || /Text/i.test(typeName);
    const nestedChildren = React.Children.map(node.props?.children, (child) =>
      sanitizeChildren(child, isTextLike)
    );
    return React.cloneElement(node, undefined, nestedChildren);
  };

  const sanitizedChildren = React.Children.map(children, (child) => sanitizeChildren(child, false));
  // #region agent log
  fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'textnode-dbg-3',hypothesisId:'H7',location:'ContentContainer.tsx:render',message:'content container render children shape deep scan',data:{childCount:childArray.length,textChildCount:textChildren.length,firstTextChild:textChildren.length?String(textChildren[0]).slice(0,20):null,textPaths:textPaths.slice(0,5),strippedTextNodes},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  return <View style={styles.container}>{sanitizedChildren}</View>;
};

