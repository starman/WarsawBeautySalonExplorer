namespace WarsawBeautySalonExplorer.DTOs;

public record UpdateSalonRequest(
    string Name,
    string Address,
    string District,
    List<string> Services,
    double Rating,
    int ReviewsCount
);