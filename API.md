business.js

1. Create new business.
    
    @name POST /api/business

    res.status(200).json({business, message:"Business account created."}).end();

    res.status(409).json({error: $the username you entered has already been registered. Please register only once.}).end();

    res.status(400).json({ error: 'Please enter username and password'}).end();

2. Sign in to business account. 

    @name POST /api/business/signin

    res.status(400).json({error: You are already signed in as another user.}).end();

    res.status(200).json({message:"Sign in successful."}).end();

    res.status(400).json({error: Credentials incorrect}).end();

    res.status(400).json({ error: 'Please enter username and password'}).end();


3. Sign out of business account.

    @name POST /api/business/signout 

    res.status(200).json({message: 'Successfully signed out'});

    res.status(400).json({error: 'You are currently not signed in'});


4. Get Description

    @name POST /api/business/description

    res.status(200).json({data:description, message: 'Get description'});

    res.status(400).json({error: Failed}).end();

5. Update Description

    @name PUT /api/business/description

    res.status(200).json({business, message:"Description Updated"}).end();


6. Get CovidInfo

    @name POST /api/business/CovidInfo

    res.status(200).json({data: CovidInfo, message: 'Get CovidInfo'});

    res.status(400).json({error: Failed}).end();


7. Update CovidInfo

    @name PUT /api/business/CovidInfo

    res.status(200).json({business, message:"CovidInfo Updated"}).end();

8.  Get Category

    @name POST /api/business/category

    res.status(200).json({data:category, message: 'Get category'});

9. Update Category

    @name PUT /api/business/category

    res.status(200).json({business, message:"Category Updated"}).end();

10. Get Mask

    @name POST /api/business/mask

    res.status(200).json({data:mask, message: 'Get mask'});

    res.status(400).json({error: Failed}).end();


11. Update Mask

    @name PUT /api/business/mask

    res.status(200).json({mask, message:"mask Updated"}).end();

12. Get Hand Sanitizer

    @name POST /api/business/handSanitizer

    res.status(200).json({data:handSanitizer, message: 'Get hand sanitizer'});

    res.status(400).json({error: Failed}).end();

13. Update Hand Sanitizer

    @name PUT /api/business/handSanitizer

    res.status(200).json({handSanitizer, message:"hand sanitizer Updated"}).end();

14. Get Schedule

    @name POST /api/business/schedule

    res.status(200).json({data:monday, message: 'Get schedule'});

    res.status(400).json({error: Failed}).end();

15. Update Monday

    @name PUT /api/business/monday

    res.status(200).json({business, message:"Monday Updated"}).end();


16. Update Tue

    @name PUT /api/business/tuesday

    res.status(200).json({business, message:"Tuesday Updated"}).end();


17. Update Wedn

    @name PUT /api/business/wednesday

    res.status(200).json({business, message:"Wedn Updated"}).end();

18. Update thur

    @name PUT /api/business/thursday

    res.status(200).json({business, message:"Thur Updated"}).end();


19. Update fri

    @name PUT /api/business/friday

    res.status(200).json({business, message:"Fri Updated"}).end();

20. Update sat

    @name PUT /api/business/saturday

    res.status(200).json({business, message:"Sat Updated"}).end();


21. Update sun

    @name PUT /api/business/sunday

    res.status(200).json({business, message:"Sun Updated"}).end();
