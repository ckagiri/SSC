export default {
  description: 'Address',
  root: false,
  properties: {
    addressType: {
      description: 'Một contact có nhiều địa chỉ với các mục đích khác nhau',
      default: 'PRIMARY',
      required: true,
      enum: [
        {
          value: 'PRIMARY',
          title: 'Địa chỉ liên hệ',
          description: 'Địa chỉ liên hệ',
        },
        {
          value: 'BILLING',
          title: 'Địa chỉ xuất hoá đơn',
          description: 'Địa chỉ xuất hoá đơn',
        },
        {
          value: 'SHIPPING',
          title: 'Địa chỉ giao hàng',
          description: 'Địa chỉ giao hàng',
        },
      ],
    },
    name: {
      description: 'Tên liên hệ',
      type: 'String',
    },
    company: 'String',
    phone: {
      description: 'Điện thoại Khi người nhận hàng là người khác',
      type: 'String',
    },
    taxID: {
      description: 'Nếu địa chỉ dùng xuất hoá đơn, yêu cầu thêm mã số thuế',
      type: 'String',
    },
    street1: 'String',
    street2: 'String',
    town: 'String',
    city: 'String',
  },
};
