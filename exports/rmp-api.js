const ratings = require('@mtucourses/rate-my-professors').default;

var runAPI = async function(res, req, findTeach){
    try {
        const schools = await ratings.searchSchool('University of Maryland, Baltimore County');
        console.log(schools);
        const teachers = await ratings.searchTeacher(findTeach, 'U2Nob29sLTEyNDQ=');
        if (teachers){
            console.log(teachers);
            const teacher = await ratings.getTeacher(teachers[0]['id']);
            if (teacher){
                console.log(teacher);
                console.log(teacher['avgRating'].toString());
                const review = teacher['ratings']['edges']
                //console.log(review)
                const rev_arr = []
                for (let i = 0 ; i < review.length; i++){
                    console.log(review[i]['node']['comment'])
                    rev_arr.push(review[i]['node']['comment'])
                }

                const rateJSON = {'name': null, 'rating': null, 'review': null};
                rateJSON['name'] = teacher['firstName'] + " "+teacher['lastName'];
                rateJSON['rating'] = teacher['avgRating'];
                rateJSON['review'] = rev_arr;
                return rateJSON;
            }
            else{
                return res.status(400).json({error: "Cannot Find Teacher"});
            }


        }
        else{
            return res.status(400).json({error: "Cannot Find Teacher"});
        }
       } catch (e) {
        console.log(e, e.message);
    }
};

module.exports = runAPI;