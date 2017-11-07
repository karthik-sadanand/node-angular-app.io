
//'use strict';

eventsApp.controller('eventController', ['$scope', '$http',function ($scope, $http) {
        var new_max;

        $scope.sortOrder = '-upvote';

        function voteLog(session){
            
            $http.get('/api/ping/answer').then(function (response) {
                console.log(response.data);
                $scope.answer = response.data;
                console.log($scope.answer.length);
                $scope.updatedAnswer={
                    "id":session.id,
                    "ans":session.ans,
                    "upvote":session.upvote
                }


                for(i=0;i<$scope.answer.length;i++){
                    if($scope.answer[i].ans == session.ans ){
                       
                        
                        $scope.answer[i].upvote = session.upvote; 
                        $scope.answer.splice(i,1,$scope.updatedAnswer);
                        console.log($scope.answer);
                    }
                }

                $http.post('/api/ping/answer', $scope.answer).success(function () {
                    console.log("POST update Success");
                }, function () {
                    console.log("POST Error");
                });
                console.log($scope.answer);

            }, function (response) {
                console.log(response);
            });

        }


        $scope.upVoteSession = function (session) {
          
            session.upvote++;

            voteLog(session);
          
        };

        $scope.downVoteSession = function (session) {
            if (session.upvote != 0) {
                session.upvote--;
                
                voteLog(session);
            }

            else {
                alert("cant be lesser than zero");
            }
        };

        $http.get('/api/ping/answer').then(function (response) {
            console.log(response.data);
            $scope.answer = response.data;
        }, function (response) {
            console.log(response);
        });

        $http.get('/api/ping/question').then(function (response) {
            console.log(response.data);
            $scope.question = response.data;
           
            console.log($scope.question[2].id);

        }, function (response) {
            console.log(response);
        });

        $scope.MaxId=function(){
            $http.get('/api/ping/question').then(function (response) {
                console.log(response.data);
                $scope.question = response.data;    
            }); 
            $scope.max=0;
            for(var i=1;i<$scope.question.length;i++)
            {
                if($scope.question[i].id>$scope.max)
                {
                    $scope.max=$scope.question[i].id;
                    console.log($scope.max);
                }
            }
            console.log($scope.max);
            new_max=$scope.max;
            console.log(new_max+1);
            new_max+=1;
            return new_max;
        } 

        $scope.addNewQuestion = function () {

            $scope.newQuestion= {
                "id" : $scope.MaxId(),
                "qname" : $scope.questionString    
            }
            alert("successfully submitted your question");

            $http.get('/api/ping/question').then(function (response) {
                console.log(response.data);
                $scope.tempQuestions = response.data;
                $scope.tempQuestions.push($scope.newQuestion);
                console.log("pushed temp q");
                console.log($scope.tempQuestions);
                $http.post('/api/ping/question', $scope.tempQuestions).success(function () {
                    console.log("POST Success");
                }, function () {
                    console.log("POST Error");
                });

            }, function (response) {
                console.log(response);
            });

        };

        $scope.addNewAnswer = function (qid,answerString) {

            $scope.newAnswer= {
                "id" : qid,
                "ans" : answerString,
                "upvote" : 0  
            }



            $http.get('/api/ping/answer').then(function (response) {
                console.log(response.data);
                $scope.tempAnswers = response.data;
                $scope.tempAnswers.push($scope.newAnswer);
                console.log("pushed temp ans");
                console.log($scope.tempAnswers);
                $http.post('/api/ping/answer', $scope.tempAnswers).success(function () {
                    console.log("POST Ans Success");
                }, function () {
                    console.log("POST Error");
                });

            }, function (response) {
                console.log(response);
            });
        
            location.reload(); 
        };


    }]);

