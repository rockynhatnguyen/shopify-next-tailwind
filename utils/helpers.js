const formatter = new Intl.NumberFormat('end-US', { 
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export default formatter;