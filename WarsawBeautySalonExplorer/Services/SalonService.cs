using System.Text.Json;
using WarsawBeautySalonExplorer.DTOs;
using WarsawBeautySalonExplorer.Exceptions;
using WarsawBeautySalonExplorer.Models;

namespace WarsawBeautySalonExplorer.Services;

public class SalonService : ISalonService
{
    private readonly string _filePath;
    private List<Salon> _salons;
    
    public SalonService(IHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "Data", "salons.json");
        _salons = LoadFromFile();
    }

    private List<Salon> LoadFromFile()
    {
        if (!File.Exists(_filePath))
        {
            return new List<Salon>();
        }

        try
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Salon>>(json, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            }) ?? new List<Salon>();
        }
        catch
        {
            throw new Exception("Failed to load salons.json");
        }
    }

    private void SaveToFile()
    {
        var json = JsonSerializer.Serialize(_salons, new JsonSerializerOptions()
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        File.WriteAllText(_filePath, json);
    }

    public IEnumerable<SalonResponse> GetAll()
    {
        return _salons.Select(s => new SalonResponse(
            s.Name,
            s.District,
            s.Rating
        )).ToList();
    }

    public SalonDetailsResponse GetById(string id)
    {
        return _salons.Where(s => s.Id == id)
            .Select(s => new SalonDetailsResponse(
                s.Name,
                s.Address,
                s.District,
                s.Services,
                s.Rating,
                s.ReviewsCount
                ))
            .FirstOrDefault() ?? throw new NotFoundException($"Salon with id {id} not found");
    }

    public void Update(string id, UpdateSalonRequest request)
    {
        var salon = _salons.FirstOrDefault(s => s.Id == id);

        if (salon == null)
        {
            throw new NotFoundException($"Salon with id {id} not found");
        }

        salon.Name = request.Name;
        salon.Address = request.Address;
        salon.District = request.District;
        salon.Services = request.Services;
        salon.Rating = request.Rating;
        salon.ReviewsCount = request.ReviewsCount;

        SaveToFile();
    }
}