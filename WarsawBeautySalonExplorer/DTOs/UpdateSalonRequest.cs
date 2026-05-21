namespace WarsawBeautySalonExplorer.DTOs;

public record UpdateSalonRequest(
    string Name,
    string Adress,
    string District,
    List<string> Services,
    double Rating,
    int ReviewsCount
);