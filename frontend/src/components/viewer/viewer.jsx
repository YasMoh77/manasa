import './viewer.css';

const PdfViewer = () => {
 
  return (
    <div dir='auto' className='mt-3 mb-5 height-full overflow-hidden'>
          <iframe title='pdf' className='pdfCanvas'  src={'http://127.0.0.1:8000/api/pdf'}></iframe>; {/* //#toolbar=0 */}
    </div>
  );
};

export default PdfViewer;
