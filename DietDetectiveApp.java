import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class DietDetectiveApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Mock databases
        List<User> userDatabase = new ArrayList<>();
        List<Restaurant> restaurantDatabase = new ArrayList<>();
        
        // Populate initial restaurants (including locations like जालंधर)
        restaurantDatabase.add(new Restaurant("Green Leaf Cafe", "जालंधर", "Vegan", 4.5));
        restaurantDatabase.add(new Restaurant("Pure Crust Bakery", "जालंधर", "Gluten-Free", 4.2));
        restaurantDatabase.add(new Restaurant("Mughlai Spice", "जालंधर", "Halal", 4.7));
        restaurantDatabase.add(new Restaurant("FitFuel Kitchen", "जालंधर", "Keto", 4.6));

        boolean running = true;
        
        while (running) {
            System.out.println("\n========================================");
            System.out.println("   🥗 WELCOME TO DIETDETECTIVE BACKEND   ");
            System.out.println("========================================");
            System.out.println("1. Sign Up (New User)");
            System.out.println("2. Login & Find Restaurants");
            System.out.println("3. Add a New Restaurant");
            System.out.println("4. Exit Application");
            System.out.print("Choose an option (1-4): ");
            
            int choice = 1;
            if (scanner.hasNextInt()) {
                choice = scanner.nextInt();
                scanner.nextLine(); // consume newline
            } else {
                scanner.nextLine();
                System.out.println("Invalid input. Please enter a number.");
                continue;
            }

            if (choice == 1) {
                // --- SIGN UP ---
                System.out.println("\n--- Create Account ---");
                System.out.print("Enter Full Name: ");
                String name = scanner.nextLine();
                
                System.out.print("Enter Email: ");
                String email = scanner.nextLine();
                
                System.out.print("Enter Password: ");
                String password = scanner.nextLine();

                System.out.println("Select Default Dietary Preference:");
                System.out.println("1. Vegan\n2. Gluten-Free\n3. Halal\n4. Keto");
                System.out.print("Enter choice (1-4): ");
                int dietChoice = scanner.nextInt();
                scanner.nextLine();

                String diet = "Vegan";
                switch (dietChoice) {
                    case 1: diet = "Vegan"; break;
                    case 2: diet = "Gluten-Free"; break;
                    case 3: diet = "Halal"; break;
                    case 4: diet = "Keto"; break;
                }

                userDatabase.add(new User(name, email, password, diet));
                System.out.println("✅ Account successfully created for " + name + "!");

            } else if (choice == 2) {
                // --- LOGIN & SEARCH ---
                System.out.println("\n--- User Login ---");
                System.out.print("Enter Email: ");
                String email = scanner.nextLine();
                System.out.print("Enter Password: ");
                String password = scanner.nextLine();

                User loggedInUser = null;
                for (User u : userDatabase) {
                    if (u.email.equalsIgnoreCase(email) && u.password.equals(password)) {
                        loggedInUser = u;
                        break;
                    }
                }

                if (loggedInUser != null) {
                    System.out.println("\n🎉 Welcome back, " + loggedInUser.name + "!");
                    System.out.println("Your saved dietary preference: " + loggedInUser.dietaryPreference);
                    
                    System.out.print("Enter target city to search (e.g., जालंधर): ");
                    String targetCity = scanner.nextLine().trim();

                    System.out.println("\n--- Recommended Restaurants in " + targetCity + " for " + loggedInUser.dietaryPreference + " ---");
                    boolean found = false;
                    for (Restaurant r : restaurantDatabase) {
                        if (r.dietaryTag.equalsIgnoreCase(loggedInUser.dietaryPreference) && r.city.equalsIgnoreCase(targetCity)) {
                            System.out.println("📍 " + r.name + " | Rating: ⭐ " + r.rating);
                            found = true;
                        }
                    }
                    if (!found) {
                        System.out.println("❌ No restaurants found matching your profile in this city. Try adding one!");
                    }

                } else {
                    System.out.println("❌ Invalid email or password. Please sign up first.");
                }

            } else if (choice == 3) {
                // --- ADD RESTAURANT ---
                System.out.println("\n--- Contribute a New Restaurant ---");
                System.out.print("Enter Restaurant Name: ");
                String restName = scanner.nextLine();
                
                System.out.print("Enter City (e.g., जालंधर): ");
                String restCity = scanner.nextLine();

                System.out.println("Select Dietary Tag:");
                System.out.println("1. Vegan\n2. Gluten-Free\n3. Halal\n4. Keto");
                System.out.print("Enter choice (1-4): ");
                int tagChoice = scanner.nextInt();
                scanner.nextLine();

                String restTag = "Vegan";
                switch (tagChoice) {
                    case 1: restTag = "Vegan"; break;
                    case 2: restTag = "Gluten-Free"; break;
                    case 3: restTag = "Halal"; break;
                    case 4: restTag = "Keto"; break;
                }

                System.out.print("Enter Rating (e.g., 4.5): ");
                double restRating = scanner.nextDouble();
                scanner.nextLine();

                restaurantDatabase.add(new Restaurant(restName, restCity, restTag, restRating));
                System.out.println("✅ Restaurant '" + restName + "' added successfully to the database!");

            } else if (choice == 4) {
                System.out.println("Exiting application. Goodbye!");
                running = false;
            } else {
                System.out.println("Invalid choice. Try again.");
            }
        }
        
        scanner.close();
    }
}

class User {
    String name;
    String email;
    String password;
    String dietaryPreference;

    public User(String name, String email, String password, String dietaryPreference) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.dietaryPreference = dietaryPreference;
    }
}

class Restaurant {
    String name;
    String city;
    String dietaryTag;
    double rating;

    public Restaurant(String name, String city, String dietaryTag, double rating) {
        this.name = name;
        this.city = city;
        this.dietaryTag = dietaryTag;
        this.rating = rating;
    }
}