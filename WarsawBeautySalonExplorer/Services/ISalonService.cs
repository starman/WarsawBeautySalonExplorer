using WarsawBeautySalonExplorer.DTOs;

namespace WarsawBeautySalonExplorer.Services;

public interface ISalonService
{
    IEnumerable<SalonResponse> GetAll();
    SalonDetailsResponse GetById(string id);
    void Update(string id, UpdateSalonRequest request);
}