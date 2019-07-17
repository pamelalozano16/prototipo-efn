const { Parser } = require('json2csv');
const fetch = require("node-fetch")
const fs = require('fs');
const path = require('path')
 

module.exports = {
 async jsontocsv(user){
  const pDPath = path.join(__dirname, '../public/busqueda.csv')
    try{
          const data = user

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