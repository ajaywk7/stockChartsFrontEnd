import { getCompanies, searchCompanies } from "../../api/companyApi";
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

export const search = async (text, setCompanies, refresh, isAdmin = false) => {
  var response = await searchCompanies(text);
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
