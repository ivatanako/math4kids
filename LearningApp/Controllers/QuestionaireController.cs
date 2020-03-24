using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LearningApp.Controllers
{
    [Route("api/[controller]")]
    public class QuestionaireController : Controller
    {
        private int totalItems = 5;

        [HttpGet("[action]/{difficulty}/{items}")]
        public IEnumerable<Questionaire> Addition(string difficulty, int items = 5)
        {
            List<Questionaire> questionaires = new List<Questionaire>();

            Difficulty difficultyObj = new Difficulty(difficulty);
                
            var rng = new Random();

            for (int count = 1; count<= items; count++)
            {
                Questionaire question = new Questionaire();
                question.Id = count;
                question.UpperValue = rng.Next(difficultyObj.MinValue, difficultyObj.MaxValue);
                question.LowerValue = rng.Next(difficultyObj.MinValue, difficultyObj.MaxValue);
                question.Operand = "+";

                questionaires.Add(question);
            }

            return questionaires;
        }

        [HttpGet("[action]/{difficulty}/{items}")]
        public IEnumerable<Questionaire> Subtraction(string difficulty, int items = 5)
        {
            List<Questionaire> questionaires = new List<Questionaire>();

            Difficulty difficultyObj = new Difficulty(difficulty);

            var rng = new Random();

            for (int count = 1; count <= items; count++)
            {
                int _upperValue = rng.Next(difficultyObj.MinValue, difficultyObj.MaxValue);
                int _lowerValue = rng.Next(difficultyObj.MinValue, difficultyObj.MaxValue);

                if(_lowerValue > _upperValue)
                {
                    int _tempValue = _upperValue;
                    _upperValue = _lowerValue;
                    _lowerValue = _tempValue;
                }

                Questionaire question = new Questionaire();
                question.Id = count;
                question.UpperValue = _upperValue;
                question.LowerValue = _lowerValue;
                question.Operand = "-";

                questionaires.Add(question);
            }

            return questionaires;
        }

        [HttpGet("[action]/{difficulty}/{items}")]
        public IEnumerable<Questionaire> Multiplication(string difficulty, int items = 5)
        {
            List<Questionaire> questionaires = new List<Questionaire>();

            Difficulty difficultyObj = new Difficulty(difficulty);

            var rng = new Random();

            for (int count = 1; count <= items; count++)
            {
                int _upperValue = rng.Next(difficultyObj.MinValue, difficultyObj.MaxValue);
                int _lowerValue = rng.Next(difficultyObj.MinValue, 10);

                if (_lowerValue > _upperValue)
                {
                    int _tempValue = _upperValue;
                    _upperValue = _lowerValue;
                    _lowerValue = _tempValue;
                }

                Questionaire question = new Questionaire();
                question.Id = count;
                question.UpperValue = _upperValue;
                question.LowerValue = _lowerValue;
                question.Operand = "x";

                questionaires.Add(question);
            }

            return questionaires;
        }

        public class Difficulty
        {
            public Difficulty(string difficulty)
            {
                int maxValue = 10;
                int minValue = 10;

                if (difficulty.Equals("easy"))
                {
                    minValue = 1;
                    maxValue = 30;
                }
                else if (difficulty.Equals("medium"))
                {
                    minValue = 1;
                    maxValue = 60;
                }
                else if (difficulty.Equals("hard"))
                {
                    minValue = 10;
                    maxValue = 100;
                }

                this.MinValue = minValue;
                this.MaxValue = maxValue;
            }

            public int MinValue { get; set; }
            public int MaxValue { get; set; }
        }

        public class Questionaire
        {
            public int Id { get; set; }
            public int UpperValue { get; set; }
            public int LowerValue { get; set; }
            public string Operand { get; set; }
            public int AnswerValue
            {
                get
                {
                    if (Operand.Equals("+"))
                        return UpperValue + LowerValue;
                    else if (Operand.Equals("-"))
                        return UpperValue - LowerValue;
                    else if (Operand.Equals("x"))
                        return UpperValue * LowerValue;
                    else
                        return UpperValue + LowerValue;
                }
            }
        }
    }
}