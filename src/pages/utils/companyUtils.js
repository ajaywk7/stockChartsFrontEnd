import { getCompanies } from "../../api/companyApi";
import AdminCompany from "../../components/company/AdminCompany";

export const get = async (setCompanies, refresh, isAdmin = false) => {
  var response = await getCompanies();
  if (response.error !== true) {
    var result = response.message.map((data) => {
      return (
        <AdminCompany
          key={data.id}
          data={data}
          refresh={refresh}
          admin={isAdmin}
        />
      );
    });
    setCompanies(result);
  }
};
