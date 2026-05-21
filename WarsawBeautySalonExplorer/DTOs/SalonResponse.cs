namespace WarsawBeautySalonExplorer.DTOs;

public record SalonResponse(
    string Id,
    string Name,
    string District,
    double Rating
);