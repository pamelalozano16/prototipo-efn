const { Parser } = require('json2csv');
const fetch = require("node-fetch")
const fs = require('fs');
const path = require('path')
 




// const fields = ['car', 'price', 'color'];
// const myCars = [
//   {
//     "car": "Audi",
//     "price": 40000,
//     "color": "blue"
//   }, {
//     "car": "BMW",
//     "price": 35000,
//     "color": "black"
//   }, {
//     "car": "Porsche",
//     "price": 60000,
//     "color": "green"
//   }
// ];
 

module.exports = {
 async jsontocsv(){
  const pDPath = path.join(__dirname, '../public/facturas.csv')
    try{
        const res = await fetch('https://prototipo-efn.herokuapp.com/facturas')
        const data = await res.json()

        const fields = [
          {
            label:'Nombre del Comprador',
            value:'name'
          },
            {
                label: 'RFC',
                value: 'rfc'
              },
              {
                label: 'Invoice Number',
                value: 'numero'
              },
            {
            label: 'Folio Fiscal',
            value: 'folioFiscal'
          },
          {
            label: 'Fecha de Factura',
            value: 'invoiceDate'
          },
          {
            label: 'Fecha de Vencimiento',
            value: 'dueDate'
          },
          {
            label: 'Moneda',
            value: 'moneda'
          },
          {
            label: 'Valor de la Factura',
            value: 'aforo'
          },
          {
            label: 'Advance Rate',
            value:'advanceRate'
          },
          {
            label:'Dias de Gracia',
            value:'bufferDays'
          },
          {
            label:'Discount Margin',
            value:'discountMargin'
          },
          {
            label:'Discount Period',
            value:'discountPeriod'
          },
          {
            label:'Fecha maxima de vencimiento',
            value:'matuDate'
          },
          {
            label:'IVA',
            value:'iva'
          },
          {
            label:'Libor',
            value:'libor'
          },
          {
            label:'Trade Date',
            value:'purchaseDate'
          },
          {
            label:'Purchase Price',
            value:'purchasePrice'
          },
          {
            label:'Estado',
            value:'status'
          }

        ];
           

        const json2csvParser = new Parser({fields, delimiter:'\|'});
const csv = json2csvParser.parse(data);
 fs.writeFileSync(pDPath, csv, (err)=>{
    if(err) throw err;
 })
// console.log(csv);
    }catch(e){
        console.log(e)
    }
}


}