import TeaSchool from '../../dist/index';
import * as pug from 'pug';
import * as path from 'path';
import {PDFOptions} from 'puppeteer';
import {Options as SassOptions} from 'node-sass';
import express from 'express';
const app: express.Application = express();

app.get('/', async (req: express.Request, res: express.Response) => {
    await toPdf();
    // res.sendFile will open directly in browser
    // res.download will download file
    res.download(path.resolve(__dirname, './output/invoice.pdf'));    
})

app.listen(1234, () => {
    console.log('running', 1234);
})


const toPdf = async () => {
    /********************************
     *         STYLE OPTIONS        *
     ********************************/
    const styleOptions: SassOptions = {
        // Get relative path from cwd to the desired file
        file: path.resolve(__dirname, 'invoice-pdf.scss'),
    };

    /********************************
     *      TEMPLATE FILE PATH      *
     ********************************/
        // Get relative path from cwd to the desired file
    const htmlTemplatePath = path.resolve(__dirname, 'invoice-pdf.template.pug');

    /********************************
     *        TEMPLATE OPTIONS      *
     ********************************/
    const htmlTemplateOptions: pug.LocalsObject = {
        invoice: {
            id: 2452,
            createdAt: '2018-10-12',
            customer: { name: 'International Bank of Blueprintya'},
            shipping: 10,
            total: 104.95,
            comments: 'Do not feed him fish',
            lines: [
                {
                    id: 1,
                    item: 'Test Jerry2',
                    price: '52.43',
                },
                {
                    id: 2,
                    item: 'Not so good toaster',
                    price: '11.62',
                },
            ]
        },
    };

    /********************************
     *        PDF FILE OPTIONS      *
     ********************************/
    const pdfOptions: PDFOptions = {
        // Output path will be relative
        path: path.resolve(__dirname, 'output', 'invoice.pdf'),
        format: 'A4',
    };

    /********************************
     *      PUTTING IT TOGETHER     *
     ********************************/
    const teaSchoolOptions: TeaSchool.GeneratePdfOptions = {
        styleOptions,
        htmlTemplatePath,
        htmlTemplateOptions,
        pdfOptions,
    };

    /**************************************************************
     *      GENERATED PDF AS A FILE AND ALSO SAVED TO A FILE      *
     **************************************************************/
    const pdfFile = await TeaSchool.generatePdf(teaSchoolOptions);
    return pdfFile;
};
