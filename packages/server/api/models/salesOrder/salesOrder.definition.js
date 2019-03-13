export default {
  description: 'Sales Order Model',
  collection: 'salesOrder',
  roles: ['consultant', 'manager'],
  root: true, // Include in root query & mutation
  readonly: false, // Readonly model
  hidden: false, // Write only model
  query: null, // default query
  pagination: true,
  properties: {
    // Order Header
    orderDate: 'DateTime',
    contact: 'Contact!',
    location: '@Location',
    orderType: {
      enum: [
        { value: 'giao_hang', title: 'Giao hàng' },
        { value: 'truc_tiep', title: 'Trực tiếp' },
        { value: 'gui_ban', title: 'Hàng gửi bán' }
      ]
    },
    orderStatus: {
      enum: [
        { value: 'quotation', title: 'Báo giá' },
        { value: 'accepted', title: 'Đã xác nhận' },
        { value: 'rejected', title: 'Từ chối' },
        { value: 'processing', title: 'Đang xử lý' },
        { value: 'paid', title: 'Đã thanh toán' },
        { value: 'shipping', title: 'Đang giao hàng' },
        { value: 'delivered', title: 'Đã nhận hàng' },
        { value: 'done', title: 'Hoàn tất' },
        { value: 'cancel', title: 'Hủy' }
      ]
    },
    notes: ['Message'],
    orderLines: {
      type: ['SalesOrderLine'],
      foreignKey: 'salesOrderId'
    },
    grandTotal: {
      description: 'Tổng tiền đơn hàng',
      type: 'Number'
    },
    shippingFee: {
      type: 'Number',
      description: 'Phí chuyển hàng'
    },
    promotionAmount: {
      description: 'Khuyến mại',
      type: 'Number'
    },
    discountAmount: {
      description: 'Giảm giá cho khách hàng Thân thiết, VIP',
      type: 'Number'
    },
    totalAmount: {
      description: 'Thành tiền = grandTotal - discountAmount - promotionAmount + shippingFee ',
      type: 'Number'
    },
    //
    revenueTotal: {
      description: 'Doanh thu tính thưởng NTV',
      type: 'Number'
    }
  }
};
