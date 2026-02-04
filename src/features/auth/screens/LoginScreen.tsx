import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Animated, Modal, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GoogleButton } from '../components/GoogleButton';
import { AppleButton } from '../components/AppleButton';
import { Button, GradientBackground, ContentContainer, CardSurface } from '@/shared/components';
import { useAuth } from '../hooks/useAuth';
import { useCompanionStore } from '@/features/companion/store/companion.store';
import { RootStackParamList } from '@/shared/types/navigation';
import { styles } from './LoginScreen.styles';
import { Colors } from '@/shared/theme/colors';
import { Typography } from '@/shared/theme/typography';
import { Spacing } from '@/shared/theme/spacing';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { loginWithGoogle, loginWithApple, isLoading } = useAuth();
  const { checkCompanion } = useCompanionStore();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [isAppleLoading, setIsAppleLoading] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<{ title: string; content: string } | null>(null);
  
  // Animaciones
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const logoScale = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      console.log('Intentando login con Google...');
      await loginWithGoogle();
      Alert.alert('Éxito', 'Login con Google iniciado. Las credenciales OAuth deben configurarse para completar el proceso.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Google:', error);
      Alert.alert(
        'Login con Google',
        errorMessage.includes('no configurado') 
          ? 'Las credenciales de Google OAuth no están configuradas. Por favor, agrega EXPO_PUBLIC_GOOGLE_CLIENT_ID en tu archivo .env'
          : `Error: ${errorMessage}`
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsAppleLoading(true);
      console.log('Intentando login con Apple...');
      await loginWithApple();
      Alert.alert('Éxito', 'Login con Apple iniciado. Las credenciales OAuth deben configurarse para completar el proceso.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Error en login con Apple:', error);
      Alert.alert(
        'Login con Apple',
        errorMessage.includes('no configurado')
          ? 'Las credenciales de Apple OAuth no están configuradas. Por favor, agrega EXPO_PUBLIC_APPLE_CLIENT_ID en tu archivo .env'
          : `Error: ${errorMessage}`
      );
    } finally {
      setIsAppleLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // TODO: Navegar a pantalla de creación de cuenta cuando esté disponible
    console.log('Create account pressed');
  };

  const handleLogin = () => {
    // TODO: Navegar a pantalla de login cuando esté disponible
    console.log('Login pressed');
  };

  const legalContent = {
    terms: {
      title: 'Términos de Servicio',
      content:
        `1. Aceptación y vigencia
Al registrarse, acceder o usar eJoi (el “Servicio”), el usuario (“Usuario”) acepta estos Términos. Si no está de acuerdo, debe abstenerse de usar el Servicio.

2. Requisito de edad
El Servicio está destinado exclusivamente a personas mayores de 18 años. Al registrarse, el Usuario declara y garantiza que cumple este requisito. eJoi podrá solicitar verificación razonable y suspender o cerrar cuentas ante indicios de incumplimiento.

3. Descripción del Servicio y naturaleza de la IA
3.1. eJoi ofrece interacciones generadas mediante sistemas de Inteligencia Artificial (“IA”), incluyendo funcionalidades de memoria contextual para continuidad y personalización.
3.2. El Usuario reconoce que las respuestas, comportamientos y “recuerdos” de la IA no corresponden a una persona real y que el Servicio no sustituye relaciones humanas.

4. No prestación de servicios profesionales (salud/mental/legal/financiero)
4.1. eJoi no proporciona servicios médicos, psicológicos, psiquiátricos, legales ni financieros.
4.2. Las interacciones tienen fines recreativos, de acompañamiento y exploración personal.
4.3. Ante crisis emocional, salud mental, ideación suicida o emergencias, el Usuario debe acudir a un profesional calificado o a servicios de emergencia.

5. Uso responsable y seguridad del Usuario
5.1. El Usuario se obliga a usar el Servicio de forma responsable y a no utilizarlo como única fuente de apoyo emocional.
5.2. eJoi podrá limitar, pausar o interrumpir interacciones y/o cuentas cuando detecte (o existan indicios razonables de) conductas que promuevan dependencia extrema, autolesiones, violencia o daño a terceros.

6. Conductas prohibidas
Se prohíbe, entre otros:
  • Usar el Servicio para fines ilegales, fraudulentos o abusivos.
  • Amenazar, acosar, incitar a la violencia o a la autolesión.
  • Suplantar identidad.
  • Intentar vulnerar la seguridad del Servicio (hacking, scraping, ingeniería inversa, explotación de fallas).
  • Publicar o transmitir contenido que infrinja derechos de terceros.

7. Cuenta, credenciales y responsabilidad
El Usuario es responsable de mantener la confidencialidad de sus credenciales y de toda actividad realizada desde su cuenta. Debe notificar a eJoi ante accesos no autorizados.

8. Contenido del Usuario y licencia para operar el Servicio
8.1. El Usuario conserva la propiedad del contenido que proporcione al Servicio.
8.2. Para operar el Servicio, el Usuario otorga a eJoi una licencia limitada, no exclusiva, revocable y mundial para alojar, procesar, reproducir técnicamente y usar dicho contenido solo con el fin de operar, mantener y mejorar la plataforma (incluyendo personalización y continuidad), conforme a la Política de Privacidad.

9. Disponibilidad, mantenimiento y cambios
eJoi no garantiza que el Servicio esté disponible de forma continua o libre de errores. Podrán existir mantenimientos, actualizaciones o interrupciones. eJoi podrá modificar el Servicio (incluyendo funcionalidades) por motivos técnicos, de seguridad, legales o de mejora.

10. Suspensión y término
eJoi podrá suspender o cancelar cuentas que incumplan estos Términos, especialmente ante conductas abusivas, ilegales o que comprometan la seguridad del sistema o de otros usuarios. Cuando sea posible, eJoi podrá notificar el motivo y habilitar un canal de apelación interna (si aplica).

11. Limitación de responsabilidad
En la medida permitida por la ley, eJoi no será responsable por daños indirectos, lucro cesante o pérdida de datos derivada del uso del Servicio. Nada de lo anterior limita responsabilidad por dolo o culpa grave cuando corresponda.

12. Comunicaciones
eJoi podrá enviar comunicaciones operacionales (por ejemplo: seguridad, cambios relevantes, soporte) al correo registrado y/o mediante notificaciones dentro del Servicio.

13. Ley aplicable y jurisdicción
Estos Términos se rigen por las leyes de la República de Chile. Cualquier controversia será sometida a los tribunales competentes de Chile.`,
    },
    privacy: {
      title: 'Política de Privacidad',
      content:
        `1. Contenido de conversaciones y datos sensibles
Las conversaciones con la IA pueden contener información personal o sensible, incluyendo emociones, experiencias personales y preferencias.
El Usuario acepta proporcionar esta información de forma voluntaria y reconoce que será utilizada únicamente para la operación, mejora y personalización del Servicio.

2. Procesamiento automatizado e Inteligencia Artificial
eJoi utiliza sistemas automatizados e inteligencia artificial para procesar la información, incluyendo el contenido de las conversaciones.
Estos procesos pueden involucrar proveedores tecnológicos externos que actúan como encargados del tratamiento, siempre bajo acuerdos de confidencialidad y medidas de seguridad.

3. Uso de datos para entrenamiento de modelos
eJoi no utiliza las conversaciones personales de los usuarios para entrenar modelos de inteligencia artificial de uso general.
Las interacciones pueden ser analizadas de forma agregada y anonimizada con fines estadísticos y de mejora del Servicio.

4. Memoria contextual y gestión de “recuerdos”
El Servicio puede utilizar mecanismos de memoria contextual para mantener continuidad en las interacciones.
El Usuario puede gestionar, modificar o eliminar ciertos recuerdos desde la configuración de su cuenta, cuando dicha funcionalidad esté disponible.

5. Decisiones automatizadas
El Servicio utiliza procesos automatizados para personalización y funcionamiento, sin que ello implique decisiones con efectos legales significativos sobre el Usuario.

6. Cookies y tecnologías similares
Utilizamos cookies y tecnologías similares para mejorar la experiencia, analizar el uso del Servicio y garantizar su correcto funcionamiento.
El Usuario puede gestionar sus preferencias desde su dispositivo o navegador.

7. Transferencias internacionales de datos
La información puede ser almacenada y procesada en servidores ubicados fuera del país de residencia del Usuario.
En dichos casos, eJoi adopta medidas para garantizar un nivel adecuado de protección de datos conforme a la legislación aplicable.

8. Menores de edad
eJoi no recopila intencionalmente información de menores de 18 años.
Si detectamos que se ha recopilado información de un menor, procederemos a su eliminación inmediata.

9. Cambios a esta Política
Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.
En caso de cambios sustanciales, notificaremos a los usuarios a través del Servicio o por correo electrónico.

10. Bases del tratamiento
El tratamiento de los datos personales se basa en:
  • el consentimiento del Usuario, cuando corresponda;
  • la ejecución del contrato (prestación del Servicio); y
  • el interés legítimo de eJoi para operar y mejorar el Servicio.`,
    },
  };

  const openModal = (type: keyof typeof legalContent) => {
    setModalContent(legalContent[type]);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const renderLegalText = (raw: string) => {
    // Mejora MUCHO la legibilidad: separa por párrafos y respeta bullets
    const blocks = raw.split('\n\n').map(s => s.trim()).filter(Boolean);
  
    return blocks.map((block, idx) => {
      // bullets simples (líneas con "•")
      if (block.includes('•')) {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        return (
          <View key={idx} style={{ marginBottom: 14 }}>
            {lines.map((line, i) => {
              const isBullet = line.startsWith('•');
              if (!isBullet) {
                return (
                  <Text key={i} style={styles.sheetParagraph}>
                    {line}
                  </Text>
                );
              }
              return (
                <View key={i} style={styles.sheetBulletRow}>
                  <Text style={styles.sheetBulletSymbol}>•</Text>
                  <Text style={styles.sheetBulletText}>{line.replace(/^•\s*/, '')}</Text>
                </View>
              );
            })}
          </View>
        );
      }
  
      return (
        <Text key={idx} style={styles.sheetParagraph}>
          {block}
        </Text>
      );
    });
  };

  const handleSkip = async () => {
    // Verificar si tiene compañera
    await checkCompanion();
    
    // Obtener el estado actualizado después de checkCompanion
    const companionState = useCompanionStore.getState();
    
    // Navegar según el estado de la compañera
    if (companionState.hasCompanion) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chat' }],
      });
    } else {
      navigation.navigate('Onboarding');
    }
  };

  return (
    <GradientBackground variant="auth" safeArea>
      <Image
        source={require('../../../../public/IMG/eJoi_INTERFAZ-11.png')}
        style={styles.heroImage}
        resizeMode="contain"
      />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ContentContainer>
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Hero Image ya está fuera del ContentContainer */}
            
            {/* Botones de autenticación social */}
            <Animated.View style={[{ opacity: fadeAnim }, styles.buttonsContainer]}>
              <CardSurface variant="glass" padding="md" radius={16}>
                <GoogleButton 
                  onPress={handleGoogleLogin} 
                  disabled={isLoading || isGoogleLoading}
                  loading={isGoogleLoading}
                />
              </CardSurface>
              <View style={{ height: Spacing.gapSm }} />
              <CardSurface variant="glass" padding="md" radius={16}>
                <AppleButton 
                  onPress={handleAppleLogin} 
                  disabled={isLoading || isAppleLoading}
                  loading={isAppleLoading}
                />
              </CardSurface>
            </Animated.View>

            {/* Botón Skip */}
            <Animated.View style={[styles.skipContainer, { opacity: fadeAnim }]}>
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>Explorar sin cuenta</Text>
              </TouchableOpacity>
            </Animated.View>

          {/* Separador */}
          

          {/* Botón Create Account */}
          

          {/* Links de términos */}
          <Animated.View 
            style={[
              styles.termsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.termsText}>
              Al registrarte, aceptas los{' '}
              <Text
                style={styles.link}
                onPress={() => openModal('terms')}
              >
                Términos de Servicio
              </Text>
              {' y la '}
              <Text
                style={styles.link}
                onPress={() => openModal('privacy')}
              >
                Política de Privacidad
              </Text>
              .
            </Text>
          </Animated.View>

          {/* Link de login */}
          <Animated.View 
            style={[
              styles.loginLinkContainer,
              { opacity: fadeAnim },
            ]}
          >
            
          </Animated.View>
        </Animated.View>
        </ContentContainer>
      </ScrollView>

      {/* Modal para Términos y Privacidad */}
      <Modal
        transparent
        visible={modalContent !== null}
        animationType="fade"
        onRequestClose={closeModal}
      >
        {/* Backdrop */}
        <Pressable style={styles.sheetBackdrop} onPress={closeModal} />

        {/* Sheet */}
        <SafeAreaView style={styles.sheetSafeArea} pointerEvents="box-none">
          <View style={styles.sheetContainer}>
            {/* Header fijo */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle} numberOfLines={1}>
                {modalContent?.title}
              </Text>

              <TouchableOpacity onPress={closeModal} style={styles.sheetCloseBtn}>
                <Text style={styles.sheetCloseText}>Cerrar</Text>
                {/*
                  Alternativa con icono:
                  <Ionicons name="close" size={20} color={Colors.text.primary} />
                */}
              </TouchableOpacity>
            </View>

            {/* Contenido scrolleable */}
            <View style={styles.sheetContent}>
              <ScrollView
                contentContainerStyle={styles.sheetScrollContent}
                showsVerticalScrollIndicator
              >
                {renderLegalText(modalContent?.content ?? '')}
              </ScrollView>
            </View>

            {/* Acción inferior opcional */}
            <View style={styles.sheetFooter}>
              <Button title="Entendido" onPress={closeModal} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </LinearGradient>
  );
};
