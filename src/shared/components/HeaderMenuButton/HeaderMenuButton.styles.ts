import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 54 : 36,
        right: 16,
        zIndex: 100,
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            default: {
                // Sombra sutil en nativo
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            },
        }),
    },
    icon: {
        fontSize: 22,
        color: '#FFFFFF',
    },
});

const debugHeaderButtonStyle = StyleSheet.flatten(styles.button) as Record<string, unknown>;
// #region agent log
fetch('http://127.0.0.1:7658/ingest/39857839-993a-4106-aeaf-5c248ccc31b2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'eaafaf'},body:JSON.stringify({sessionId:'eaafaf',runId:'shadow-dbg-7',hypothesisId:'H7',location:'HeaderMenuButton.styles.ts:moduleInit',message:'header menu button styles resolved',data:{platform:Platform.OS,hasShadowColor:Object.prototype.hasOwnProperty.call(debugHeaderButtonStyle ?? {},'shadowColor'),hasBoxShadow:Object.prototype.hasOwnProperty.call(debugHeaderButtonStyle ?? {},'boxShadow')},timestamp:Date.now()})}).catch(()=>{});
// #endregion
