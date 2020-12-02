
# [Kovid](https://kovid-ckqw.herokuapp.com/ )
## [CKQW]
### Purpose
Purpose: Kovid aims to present users an interactive Cambridge map that embeds operation status and Covid-related information about Cambridge businesses. This makes it easy for customers to find businesses that suit their needs especially under the Covid situation because businesses have to change operation statuses and policies regularly in response to the disease. By presenting consumers the services that are available to them, Kovid also increases market efficiency, helping businesses make more profit.  
 

### Functionality

For proof of concept, we implemented an interactive map that 
1) allows zooming in and zooming out
2) allows searching for a business name-- if the business is in the government database, must   share identical name with the government database
3) Pinpoint business location on the map and a pop-up window summarizing the business’s    information will show.
4) Remove pinpoint by clear button

For Minimum Viable Product, we added user and business homepage and their supporting functions as follow:
1) Create user and business account and change username and password
2) Post rating and review
3) User homepage with reviews gave and replies received
4) Business homepage with category, description, operating status, COVID info, rating, and reviews




### Instructions to Run Locally:
* Command line: npm run serve frontend (may need to npm install)
* Another shell:npm run serve backend
* Access localhost 8080 browser
* Frontend- Map display center in Cambridge, MA,US
* Search bar with input
* EX: “dUNkIn”
* We support search of any business in this government db: https://data.cambridgema.gov/Economic-Development/Open-and-Closed-Businesses-During-Covid-19-Pandemi/9q33-qjp4
* We now support partial search, which will return a max of 10 businesses that contains the input of search bar as a substring, regardless of cases
* Clear button
* Zoom in and out
* Customer and business account creation and log in
* Customer/Business homepage
* Post rating and review (Customer Only)
* Customer homepage with reviews gave and replies received 
* Only Business have reply function
* Business homepage with category, description, operating status, COVID info, rating, and reviews
* COVID info includes mask and hand sanitizer as default, each with a dropdown bar that each business can change after signing in. A business can also add personal input in the textbar below using format “info1: rule1, info2: rule2, info3: rule3…” (also included in the placeholder)
* Business owner are free to modify any the homepage information
* Choose a category for future filter purpose
* Free to add description
* Edit hour of operations



### Authorship:
For PoC:
* General Code Structure: Winnie+Cindy
* Map API: Cindy+Winnie
* Search: Queenie
* PopUp: Queenie
* Geocode API:Winnie+Queenie
* GetData(government database):Winnie
* Initialized local database: Kelly+Cindy
* Account Login Page: Kelly+Cindy

For MVP:
* Partial Search of businesses: Kelly
* COVID Info: Kelly
* API.md: Kelly
* Design update: Kelly + Winnie + Queenie
* Business SignIn+SignOut: Queenie
* Business SignUp: Cindy
* Business Description: Winnie
* Business Category: Winnie
* Business Operating Status: Winnie
* Business Rating+Review: Queenie
* Business Reply: Cindy
* Customer SignIn SignUp: Queenie+Cindy
* Customer Profile Page (showing reviews, change username/password, showing reviews given by customer): Cindy
* General Frontend Routing+Interface Polish: Queenie
* Routing from PopUp to Business Homepage: Winnie


