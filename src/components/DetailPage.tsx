import { useParams } from 'react-router-dom';

function DetailPage() {
  const { site } = useParams();

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold">Site Details</h1>
      <p className="mt-4 text-lg">Sample Site: {site}</p>

      {/* You can now fetch or display more info using `site` */}
    </div>
  );
}

export default DetailPage;
