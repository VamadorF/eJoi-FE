import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { Colors } from '@/shared/theme/colors';
import { styles } from './LogoutConfirmModal.styles';

interface LogoutConfirmModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

/**
 * Modal de confirmación para cerrar sesión.
 * Usa RN Modal nativo para manejar correctamente z-index y touches.
 */
export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    isLoading,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={isLoading ? undefined : onCancel}
        >
            {/* Backdrop: cierra al tocar fuera */}
            <Pressable
                style={styles.overlay}
                onPress={isLoading ? undefined : onCancel}
            >
                {/* Modal card: stopPropagation para que los toques no cierren el modal */}
                <Pressable style={styles.modal} onPress={() => { }}>
                    {/* Icono */}
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>⚠️</Text>
                    </View>

                    {/* Título */}
                    <Text style={styles.title}>Cerrar sesión</Text>

                    {/* Mensaje */}
                    <Text style={styles.message}>
                        ¿Seguro que quieres cerrar sesión? Se perderán tus datos en este
                        dispositivo.
                    </Text>

                    {/* Acciones */}
                    <View style={styles.actions}>
                        {/* Botón Cerrar sesión (destructivo) */}
                        <TouchableOpacity
                            style={[
                                styles.logoutButton,
                                isLoading && styles.logoutButtonDisabled,
                            ]}
                            onPress={onConfirm}
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            {isLoading ? (
                                <>
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                    <Text style={styles.loadingText}>Cerrando sesión…</Text>
                                </>
                            ) : (
                                <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                            )}
                        </TouchableOpacity>

                        {/* Botón Cancelar */}
                        {!isLoading && (
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onCancel}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
