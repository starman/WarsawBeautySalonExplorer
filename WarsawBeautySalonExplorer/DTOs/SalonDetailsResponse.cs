namespace WarsawBeautySalonExplorer.DTOs;

public record SalonDetailsResponse(
    string Name,
    string Adress,
    string District,
    List<string> Services,
    double Rating,
    int ReviewsCount
);