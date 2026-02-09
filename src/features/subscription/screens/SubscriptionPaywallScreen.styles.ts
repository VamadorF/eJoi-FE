import { StyleSheet } from 'react-native';
import { Colors } from '@/shared/theme/colors';

export const styles = StyleSheet.create({
  // =========================
  // TEXTOS SUPERIORES
  // =========================
  title: {
    color: Colors.text.primary,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    color: Colors.text.secondary,
    fontSize: 14,
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 120, // espacio para el botón fijo inferior
  },
  grid: {
    gap: 14,
    paddingBottom: 120, // espacio para el botón fijo inferior
  },

  // =========================
  // TARJETA: BORDE EXTERNO (GRADIENTE)
  // =========================
  // Outer border
  cardOuter: {
    borderRadius: 22,
    padding: 2,
  },
  cardOuterActive: {
    shadowColor: '#FF2D87',
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 7, // Android
  },

  // =========================
  // TARJETA: CONTENIDO INTERNO
  // =========================
  // Inner card
  cardInner: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    overflow: 'hidden', // 
  },
  cardInnerActive: {
    backgroundColor: 'rgba(255,255,255,0.96)', // 
  },

  // =========================
  // HERO (IMAGEN SUPERIOR)
  // =========================
  // ✅ HERO full-bleed
  hero: {
    width: '100%',
    aspectRatio: 3,
    height: 190,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden', // 
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroBgImg: {
    width: '100%',
    height: '100%', 
  },
  heroOverlay: {
    
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
  },
  heroVignette: {
    // viñeta suave en todo el hero
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // =========================
  // PILL “TOCA PARA ELEGIR” / “SELECCIONADO”
  // =========================
  // Hint pill
  tapPill: {
    position: 'absolute',
    left: 12,
    top: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  tapPillActive: {
    // estado activo (seleccionado)
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: 'rgba(255,45,135,0.25)',
  },
  tapPillText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#2A2A2A',
  },
  tapPillTextActive: {
    color: '#FF2D87', // texto rosado cuando está seleccionado
  },

  // =========================
  // PILL DEL PRECIO
  // =========================
  // Price pill
  pricePill: {
    position: 'absolute',
    right: 12,
    top: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.90)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  pricePillActive: {
    // borde rosado cuando está seleccionado
    borderColor: 'rgba(255,45,135,0.22)',
  },
  pricePillText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#2A2A2A',
  },

  // =========================
  // PILL “RECOMENDADO”
  // =========================
  // Recommended pill
  recoPill: {
    // Ya no es absoluto, se posiciona en el flujo del body
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(255,45,135,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,45,135,0.28)',
  },
  recoPillText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FF2D87',
  },
  recoPillWrapper: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 4,
  },

  // =========================
  // CUERPO DE LA TARJETA (TEXTO + PERKS)
  // =========================
  // Body
  body: {
    padding: 16,
  },

  planTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F1F1F',
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    color: '#5B5B5B',
    marginBottom: 12,
  },

  // =========================
  // PERKS (LISTA DE BENEFICIOS)
  // =========================
  perks: {
    gap: 10,
    marginBottom: 6,
  },
  perksTwoCols: {
    // Se usa cuando hay espacio (web/tablet): 2 columnas
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    rowGap: 10,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perkRowTwoCols: {
    width: '48%', // ancho para “2 columnas”
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  checkDotActive: {
    backgroundColor: '#FF2D87', // 
  },
  perkText: {
    fontSize: 13,
    color: '#2A2A2A',
    opacity: 0.92,
    flexShrink: 1,
  },

  // =========================
  // ACENTO INFERIOR (solo cuando está seleccionado)
  // =========================
  bottomAccent: {
    height: 10,
    borderRadius: 999,
    marginTop: 12,
  },
});
