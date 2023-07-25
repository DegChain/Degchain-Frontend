import React from "react";
import axios from "axios";
import { RiLoader4Line } from "react-icons/ri";

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <RiLoader4Line className="animate-spin text-4xl text-gray-500" />
    </div>
  );
};

const Inquiries = () => {
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get<Inquiry[]>("/api/inquiries");
      setInquiries(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inquiries</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => (
              <tr key={inquiry._id}>
                <td className="border px-4 py-2">{inquiry.name}</td>
                <td className="border px-4 py-2">{inquiry.phone}</td>
                <td className="border px-4 py-2">{inquiry.email}</td>
                <td className="border px-4 py-2">{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inquiries;
