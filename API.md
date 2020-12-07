We understand that many of our request to get information need to change from "POST" to "GET". But because we were encountering some strange bugs working with GET, we decided to first work with POST to allow implementation of the entire pipeline but haven't got enough time to go back and fix the url. We will make sure to change the POST to GET for these get information requests for the final project.

business.js

1. Create new business.
    
    @name POST /api/businesses

    res.status(200).json({business, message:"Business account created."}).end();

    res.status(409).json({error: $the username you entered has already been registered. Please register only once.}).end();

    res.status(400).json({ error: 'Please enter username and password'}).end();

2. Sign in to business account. 

    @name POST /api/businesses/signin

    res.status(400).json({error: You are already signed in as another user.}).end();

    res.status(200).json({message:"Sign in successful."}).end();

    res.status(400).json({error: Credentials incorrect}).end();

    res.status(400).json({ error: 'Please enter username and password'}).end();


3. Sign out of business account.

    @name POST /api/businesses/signout 

    res.status(200).json({message: 'Successfully signed out'});

    res.status(400).json({error: 'You are currently not signed in'});


4. Get Description

    @name GET /api/businesses/:businessName/:address/description

    res.status(200).json({data:description, message: 'Get description'});

    res.status(400).json({error: Failed}).end();

5. Update Description

    @name PUT /api/businesses/:businessName/:address/description

    res.status(200).json({business, message:"Description Updated"}).end();


6. Get CovidInfo

    @name GET /api/businesses/:businessName/:address/CovidInfo

    res.status(200).json({data: CovidInfo, message: 'Get CovidInfo'});

    res.status(400).json({error: Failed}).end();


7. Update CovidInfo

    @name PUT /api/businesses/:businessName/:address/CovidInfo

    res.status(200).json({business, message:"CovidInfo Updated"}).end();

8.  Get Category

    @name GET /api/businesses/:businessName/:address/category

    res.status(200).json({data:category, message: 'Get category'});

9. Update Category

    @name PUT /api/businesses/:businessName/:address/category

    res.status(200).json({business, message:"Category Updated"}).end();

10. Get Mask

    @name GET /api/businesses/:businessName/:address/mask

    res.status(200).json({data:mask, message: 'Get mask'});

    res.status(400).json({error: Failed}).end();


11. Update Mask

    @name PUT /api/businesses/:businessName/:address/mask

    res.status(200).json({mask, message:"mask Updated"}).end();

12. Get Hand Sanitizer

    @name GET /api/businesses/:businessName/:address/handSanitizer

    res.status(200).json({data:handSanitizer, message: 'Get hand sanitizer'});

    res.status(400).json({error: Failed}).end();

13. Update Hand Sanitizer

    @name PUT /api/businesses/:businessName/:address/handSanitizer

    res.status(200).json({handSanitizer, message:"hand sanitizer Updated"}).end();

14. Get Schedule

    @name GET /api/businesses/:businessName/:address/schedule

    res.status(200).json({data:monday, message: 'Get schedule'});

    res.status(400).json({error: Failed}).end();

15. Update Monday

    @name PUT /api/businesses/:businessName/:address/monday

    res.status(200).json({business, message:"Monday Updated"}).end();


16. Update Tue

    @name PUT /api/businesses/:businessName/:address/tuesday

    res.status(200).json({business, message:"Tuesday Updated"}).end();


17. Update Wedn

    @name PUT /api/businesses/:businessName/:address/wednesday

    res.status(200).json({business, message:"Wedn Updated"}).end();

18. Update thur

    @name PUT /api/businesses/:businessName/:address/thursday

    res.status(200).json({business, message:"Thur Updated"}).end();


19. Update fri

    @name PUT /api/businesses/:businessName/:address/friday

    res.status(200).json({business, message:"Fri Updated"}).end();

20. Update sat

    @name PUT /api/businesses/:businessName/:address/saturday

    res.status(200).json({business, message:"Sat Updated"}).end();


21. Update sun

    @name PUT /api/businesses/:businessName/:address/sunday

    res.status(200).json({business, message:"Sun Updated"}).end();

22. Get all review data for business.

    @name GET /api/businesses/:businessName/:address/reviews
    
    res.status(200).json({reviews,serviceRating,covidRating}).end();

23. Get all data

    @name POST /api/businesses/all
 
    res.status(200).json({allData, message:"All data found"}).end();


customer.js

1. Create new customer.

    @name POST /api/customers

    res.status(200).json({customer, message:"Customer account created."}).end();

    res.status(409).json({error: the username you entered has already been registered. Please register only once.}).end();

    res.status(400).json({error: Please enter username and password}).end();

2.  Sign in to customer account.

    @name POST /api/customers/signin

    res.status(400).json({error: You are already signed in as a different user.}).end();

    res.status(200).json({name: req.body.username,message:"Customer sign-in successful."}).end();

    res.status(400).json({error: Credentials incorrect}).end();

    res.status(400).json({ error: 'Please enter username and password'}).end();

3. Sign out of customer account.

    @name POST /api/customers/signout 

    res.status(200).json({message: 'Successfully signed out'});

    res.status(400).json({error: 'You are currently not signed in'});

4. Update username

    @name PUT /api/customers/username

    res.status(200).json({name: req.body.username, message:"Username updated."}).end();

    res.status(409).json({error: this username has already been registered. Please register only once.}).end();

    res.status(400).json({error: Username cannot be empty.}).end();

5. Update password

    @name PUT /api/customers/password

    res.status(200).json({message:"Password updated."}).end();

    res.status(400).json({error: err}).end();

    res.status(400).json({error: Password cannot be empty.}).end();

6. Get all reviews made by a customer.

    @name GET /api/customers/:username/reviews

    res.status(200).json({reviews}).end();

reply.js

1. Post a new reply.

    @name POST /api/replies

    res.status(200).json({message:"Successfully posted your reply!."}).end();

    res.status(400).json({error: err}).end();

    res.status(400).json({ error: 'Cannot submit an empty reply'}).end();


2. Get all replies received by a customer.

    @name GET /api/replies?customer=username

    res.status(200).json({reviews}).end();

review.js

1. Post a new review.

    @name POST /api/reviews

    res.status(200).json({message:"Successfully posted your review!."}).end();

    res.status(400).json({error: err}).end();

    res.status(400).json({ error: 'Please fill in all ratings and provide some comments!'}).end();

search.js

1. Get latlon of the address of the searched business

    @name GET /api/latlong?address=address

    res.status(200).send({latitude,longitude}).end();

