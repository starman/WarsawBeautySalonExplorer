namespace WarsawBeautySalonExplorer.DTOs;

public record SalonDetailsResponse(
    string Name,
    string Address,
    string District,
    List<string> Services,
    double Rating,
    int ReviewsCount
);