class ProductValidator {
    isAValidProductName(name: string): boolean {
        return typeof name === 'string' && name.trim().length > 0;
    }

    isAValidProductPrice(price: number): boolean {
        return typeof price === 'number' && price > 0;
    }

    isAValidProductDescription(description: string): boolean {
        return typeof description === 'string' || description === undefined;
    }

    isAValidProductStock(stock: number): boolean {
        return Number.isInteger(stock) && stock >= 0;
    }

    isAValidProductData(product: any): boolean {
        return (
            this.isAValidProductName(product.name) &&
            this.isAValidProductPrice(product.price) &&
            this.isAValidProductDescription(product.description) &&
            this.isAValidProductStock(product.stock)
        );
    }
}

export default ProductValidator;