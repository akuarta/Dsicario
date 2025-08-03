import React, { memo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ProductBadges from './ProductBadges';
import globalStyles from '../styles/globalStyles';
import theme from '../theme';
import { formatPrice, calculateDiscountedPrice } from '../utils/api';

const { colors, spacing, typography, borders } = theme;

/**
 * Enhanced Product Item Component with new API fields
 * Memoized to prevent unnecessary re-renders
 */
const ProductItem = memo(({ 
  product, 
  onPress, 
  style,
  showCategory = true,
  showBadges = true,
  showRating = true,
  imageStyle,
  compact = false 
}) => {
  const handlePress = () => {
    if (product.agotado) return; // Don't allow navigation if out of stock
    onPress?.(product);
  };

  // Calculate final price with discount
  const originalPrice = parseFloat(product.precio) || 0;
  const finalPrice = product.descuento > 0 
    ? calculateDiscountedPrice(originalPrice, product.descuento)
    : originalPrice;

  const renderImage = () => (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: product.imagen }} 
        style={[
          compact ? styles.compactImage : globalStyles.productImage,
          imageStyle,
          product.agotado && styles.outOfStockImage
        ]}
        resizeMode="cover"
        defaultSource={{ uri: 'https://via.placeholder.com/300x200?text=Cargando...' }}
      />
      
      {/* Overlay for out of stock */}
      {product.agotado && (
        <View style={styles.outOfStockOverlay}>
          <FontAwesome5 name="times-circle" size={24} color={colors.text.white} />
          <Text style={styles.outOfStockText}>Agotado</Text>
        </View>
      )}
      
      {/* Rating badge on image */}
      {showRating && product.rating > 0 && !compact && (
        <View style={styles.ratingBadge}>
          <FontAwesome5 name="star" size={10} color={colors.accent} solid />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      )}
    </View>
  );

  const renderPriceInfo = () => (
    <View style={styles.priceContainer}>
      {product.descuento > 0 ? (
        <View style={styles.discountPriceContainer}>
          <Text style={[styles.originalPrice, compact && styles.compactOriginalPrice]}>
            {formatPrice(originalPrice)}
          </Text>
          <Text style={[styles.discountedPrice, compact && styles.compactPrice]}>
            {formatPrice(finalPrice)}
          </Text>
        </View>
      ) : (
        <Text style={[styles.priceText, compact && styles.compactPrice]}>
          {formatPrice(finalPrice)}
        </Text>
      )}
    </View>
  );

  const renderProductInfo = () => (
    <View style={[styles.productInfo, compact && styles.compactProductInfo]}>
      {showCategory && product.categoria && !compact && (
        <Text style={styles.categoryText} numberOfLines={1}>
          {product.categoria}
        </Text>
      )}
      
      <Text 
        style={[
          styles.productName, 
          compact && styles.compactName,
          product.agotado && styles.outOfStockText
        ]} 
        numberOfLines={compact ? 1 : 2}
      >
        {product.nombre}
      </Text>
      
      {product.subcategoria && !compact && (
        <Text style={styles.subcategoryText} numberOfLines={1}>
          {product.subcategoria}
        </Text>
      )}
      
      {renderPriceInfo()}
      
      {showBadges && (
        <ProductBadges 
          product={product} 
          size={compact ? 'small' : 'small'}
          maxBadges={compact ? 2 : 3}
          style={styles.badges}
        />
      )}
    </View>
  );

  const renderCompactLayout = () => (
    <TouchableOpacity 
      style={[
        styles.compactContainer, 
        style,
        product.agotado && styles.outOfStockContainer
      ]}
      onPress={handlePress}
      activeOpacity={product.agotado ? 1 : 0.7}
      disabled={product.agotado}
    >
      {renderImage()}
      <View style={styles.compactInfo}>
        {renderProductInfo()}
      </View>
      {!product.agotado && (
        <FontAwesome5 
          name="chevron-right" 
          size={16} 
          color={colors.text.light} 
        />
      )}
    </TouchableOpacity>
  );

  const renderGridLayout = () => (
    <TouchableOpacity 
      style={[
        styles.gridContainer, 
        style,
        product.agotado && styles.outOfStockContainer
      ]}
      onPress={handlePress}
      activeOpacity={product.agotado ? 1 : 0.7}
      disabled={product.agotado}
    >
      {renderImage()}
      {renderProductInfo()}
    </TouchableOpacity>
  );

  return compact ? renderCompactLayout() : renderGridLayout();
});

// Display name for debugging
ProductItem.displayName = 'ProductItem';

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: colors.background,
    borderRadius: borders.radius.lg,
    padding: spacing.sm,
    margin: spacing.xs,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borders.radius.md,
    ...theme.shadows.small,
  },
  
  outOfStockContainer: {
    opacity: 0.6,
    backgroundColor: colors.surface,
  },
  
  imageContainer: {
    position: 'relative',
  },
  
  compactImage: {
    width: 60,
    height: 60,
    borderRadius: borders.radius.sm,
    marginRight: spacing.md,
  },
  
  outOfStockImage: {
    opacity: 0.5,
  },
  
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borders.radius.md,
  },
  
  outOfStockText: {
    color: colors.text.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    marginTop: spacing.xs / 2,
  },
  
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borders.radius.sm,
  },
  
  ratingText: {
    color: colors.text.white,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
    marginLeft: 2,
  },
  
  compactInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  
  productInfo: {
    width: '100%',
    alignItems: 'center',
  },
  
  compactProductInfo: {
    alignItems: 'flex-start',
  },
  
  categoryText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  
  productName: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  compactName: {
    textAlign: 'left',
    fontSize: typography.sizes.md,
  },
  
  subcategoryText: {
    fontSize: typography.sizes.xs,
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  priceContainer: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  
  discountPriceContainer: {
    alignItems: 'center',
  },
  
  priceText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  
  compactPrice: {
    fontSize: typography.sizes.sm,
  },
  
  originalPrice: {
    fontSize: typography.sizes.sm,
    color: colors.text.light,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  
  compactOriginalPrice: {
    fontSize: typography.sizes.xs,
  },
  
  discountedPrice: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
    color: colors.error,
  },
  
  badges: {
    marginTop: spacing.xs,
  },
});

export default ProductItem;