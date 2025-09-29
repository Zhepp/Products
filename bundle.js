(function() {
    'use strict';

    var _0x236be8, _0x280a10;

    var hideWrongOptions = function(_0x2b2334) {
        _0x2b2334['style']['opacity'] = '20%';
    };

    var highlightCorrectAnswer = function(questionData) {
        var optionsContainer = (function() {
            var selector = 'body > div.container-component > div > div.page-container > div.room-container > div.screen-game > div.room-component > div > div > div.options-container';
            var element = document.querySelector(selector);
            if (!element) {
                throw new Error('Could not retreive list element');
            }
            return element;
        })();

        var optionsElements = Array.prototype.slice.call(optionsContainer.children);

        if (Array.isArray(questionData.structure.answer) && questionData.structure.answer.length < 1 && questionData.structure.options) {
            var allOptions = questionData.structure.options.map(function(_0x2d9a38) {
                return _0x2d9a38.label;
            }).join(' or ');
            alert(allOptions);
        } else {
            optionsElements.filter(function(optionElement) {
                var isWrong;
                var actualIndex = optionElement.__vue__.optionData.actualIndex;

                if (Array.isArray(questionData.structure.answer) && questionData.structure.answer.length > 0) {
                    isWrong = !questionData.structure.answer.some(function(correctIndex) {
                        return actualIndex === correctIndex;
                    });
                } else if ('number' == typeof questionData.structure.answer) {
                    isWrong = actualIndex !== questionData.structure.answer;
                } else {
                    console.log('Error setting type', questionData);
                    isWrong = false;
                }
                return isWrong;
            }).forEach(hideWrongOptions);
        }
    };

    var getRoomHash = function() {
        var rootElement = document.querySelector('body > div.container-component');
        if (!rootElement) {
            throw new Error('Could not retreive root object');
        }
        return rootElement['__vue__']['$store']['_vm']['$$state']['game']['data']['roomHash'];
    };

    _0x280a10 = function() {
        // Log watermark di awal
        console.log("%c \n    Script created by gbarski#5119 \n    https://github.com/gbarski/quizizz-cheat\n", 'color: red;');
        
        // Fetch Quiz Data
        var roomHash = getRoomHash();
        return fetch('https://quizizz.com/_api/main/game/' + roomHash)
            .then(function(response) { return response.json(); })
            .then(function(quizData) {
                var previousQuestionId = undefined;

                // Loop pemantauan pertanyaan
                setInterval(function() {
                    var currentGameState = (function() {
                        var rootElement = document.querySelector('body > div.container-component');
                        if (!rootElement) throw new Error('Could not retreive roomHash');
                        var vueData = rootElement['__vue__'];
                        return {
                            'roomHash': vueData['$store']['_data']['$$state']['game']['data']['roomHash'],
                            'playerId': vueData['$store']['_data']['$$state']['game']['player']['playerId'],
                            'quizID': vueData['$store']['_vm']['$$state']['game']['questions']['quizId'],
                            'roomCode': vueData['$store']['_vm']['$$state']['game']['questions']['roomCode'],
                            'currentId': vueData['$store']['_data']['$$state']['game']['questions']['currentId']
                        };
                    })();

                    if (currentGameState.currentId !== previousQuestionId) {
                        for (var i = 0; i < quizData.questions.length; i++) {
                            var question = quizData.questions[i];
                            if (currentGameState.currentId === question._id) {
                                console.log({ 'q': question });
                                highlightCorrectAnswer(question);
                                previousQuestionId = currentGameState.currentId;
                                break;
                            }
                        }
                    }
                }, 250);
            });
    };

    new((_0x236be8 = void 0x0) || (_0x236be8 = Promise))(function(_0x11bebd, _0x1a3dd6) {
        // Promise execution logic (menggantikan generator)
        _0x280a10().then(_0x11bebd, _0x1a3dd6);
    });
})();
