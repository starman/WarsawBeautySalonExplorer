namespace WarsawBeautySalonExplorer.Models;

public class Salon
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public List<string> Services { get; set; } = new();
    public double Rating { get; set; }
    public int ReviewsCount { get; set; }
}