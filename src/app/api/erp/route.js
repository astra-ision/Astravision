import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, id, data } = body;

    switch (action) {
      case 'add-product':
        // In a real implementation, save to database
        const newProduct = {
          id: Date.now(),
          name: data.name,
          category: data.category,
          stock: parseInt(data.stock) || 0,
          price: data.price,
          status: data.stock > 0 ? 'In Stock' : 'Out of Stock',
          created: new Date().toISOString()
        };
        return NextResponse.json(newProduct);

      case 'update-product':
        // In a real implementation, update in database
        const updatedProduct = {
          id: id,
          ...data,
          status: data.stock > 0 ? (data.stock <= 10 ? 'Low Stock' : 'In Stock') : 'Out of Stock',
          updated: new Date().toISOString()
        };
        return NextResponse.json(updatedProduct);

      case 'delete-product':
        // In a real implementation, delete from database
        return NextResponse.json({ success: true, id });

      case 'create-order':
        // In a real implementation, create an order
        const orderId = 'ORD-' + Date.now().toString().slice(-4);
        const newOrder = {
          id: orderId,
          customer: data.customer,
          items: data.items,
          total: data.total,
          status: 'Processing',
          date: new Date().toISOString(),
          paymentMethod: data.paymentMethod || 'Credit Card',
          shippingAddress: data.shippingAddress
        };
        return NextResponse.json(newOrder);

      case 'update-order-status':
        // In a real implementation, update order status
        return NextResponse.json({
          id: id,
          status: data.status,
          updatedAt: new Date().toISOString()
        });

      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('ERP API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');
  const category = searchParams.get('category');

  try {
    switch (action) {
      case 'products':
        // In a real implementation, fetch from database
        let mockProducts = [
          { id: 1, name: 'Product A', category: 'Electronics', stock: 124, price: '$899', status: 'In Stock' },
          { id: 2, name: 'Product B', category: 'Furniture', stock: 43, price: '$1,299', status: 'In Stock' },
          { id: 3, name: 'Product C', category: 'Electronics', stock: 0, price: '$599', status: 'Out of Stock' },
          { id: 4, name: 'Product D', category: 'Clothing', stock: 35, price: '$49', status: 'In Stock' },
          { id: 5, name: 'Product E', category: 'Accessories', stock: 5, price: '$129', status: 'Low Stock' },
        ];
        
        // Filter by category if provided
        if (category) {
          mockProducts = mockProducts.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        return NextResponse.json(mockProducts);

      case 'product':
        if (!id) {
          return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }
        
        // In a real implementation, fetch specific product
        const mockProduct = {
          id: parseInt(id),
          name: 'Product A',
          category: 'Electronics',
          stock: 124,
          price: '$899',
          status: 'In Stock',
          description: 'High-quality electronic device with advanced features.',
          sku: 'PROD-A-123',
          barcode: '123456789012',
          dimensions: '10 x 15 x 5 cm',
          weight: '1.2 kg',
          supplier: 'ElectroSupply Inc.',
          reorderPoint: 20,
          costPrice: '$650'
        };
        
        return NextResponse.json(mockProduct);

      case 'orders':
        // In a real implementation, fetch orders
        const mockOrders = [
          { id: 'ORD-1001', customer: 'John Doe', date: '2023-03-15', total: '$1,299', status: 'Delivered' },
          { id: 'ORD-1002', customer: 'Jane Smith', date: '2023-03-17', total: '$599', status: 'Processing' },
          { id: 'ORD-1003', customer: 'Robert Johnson', date: '2023-03-18', total: '$49', status: 'Shipped' },
          { id: 'ORD-1004', customer: 'Sarah Williams', date: '2023-03-20', total: '$899', status: 'Processing' },
        ];
        
        return NextResponse.json(mockOrders);

      case 'order':
        if (!id) {
          return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
        }
        
        // In a real implementation, fetch specific order
        const mockOrder = {
          id: id,
          customer: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          date: '2023-03-15',
          status: 'Delivered',
          total: '$1,299',
          paymentMethod: 'Credit Card',
          shippingAddress: '123 Main St, Anytown, AN 12345',
          items: [
            { id: 1, product: 'Product B', quantity: 1, price: '$1,299', total: '$1,299' }
          ],
          trackingNumber: 'TRK123456789',
          notes: 'Customer requested gift wrapping.'
        };
        
        return NextResponse.json(mockOrder);

      case 'inventory-summary':
        // In a real implementation, generate inventory summary
        const mockSummary = {
          totalProducts: 157,
          totalValue: '$145,278',
          lowStockItems: 12,
          outOfStockItems: 5,
          categories: [
            { name: 'Electronics', count: 45, value: '$58,900' },
            { name: 'Furniture', count: 32, value: '$47,300' },
            { name: 'Clothing', count: 50, value: '$18,500' },
            { name: 'Accessories', count: 30, value: '$20,578' }
          ]
        };
        
        return NextResponse.json(mockSummary);

      default:
        return NextResponse.json({ message: 'ERP API is working' });
    }
  } catch (error) {
    console.error('ERP API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
} 