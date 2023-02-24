import * as Inflector from "inflected";
import * as _pluralize from "pluralize";

// Inflector.singularize("Categories");
// Inflector.camelize("nerd_bar", false);
// Inflector.underscore('FooBar')      // => 'foo_bar'
// //Inflector.humanize('employee_salary')                   // => 'Employee salary'
// //Inflector.humanize('author_id')                         // => 'Author'
// Inflector.humanize('author_id', { capitalize: false })  // => 'author'

// Inflector.titleize('man from the boondocks')   // => 'Man From The Boondocks'
// Inflector.titleize('x-men: the last stand')    // => 'X Men: The Last Stand'
// Inflector.titleize('TheManWithoutAPast')       // => 'The Man Without A Past'
// Inflector.titleize('raiders_of_the_lost_ark')  // => 'Raiders Of The Lost Ark'

// Inflector.tableize('RawScaledScorer')  // => 'raw_scaled_scorers'
// Inflector.tableize('egg_and_ham')      // => 'egg_and_hams'
// Inflector.tableize('fancyCategory')    // => 'fancy_categories'

// Inflector.classify('egg_and_hams')  // => 'EggAndHam'

// ======================== pluralize =========================


// pluralize('test') //=> "tests"
// pluralize('test', 0) //=> "tests"
// pluralize('test', 1) //=> "test"
// pluralize('test', 5) //=> "tests"
// pluralize('test', 1, true) //=> "1 test"
// pluralize('test', 5, true) //=> "5 tests"
// pluralize('蘋果', 2, true) //=> "2 蘋果"

// // Example of new plural rule:
// pluralize.plural('regex') //=> "regexes"
// pluralize.addPluralRule(/gex$/i, 'gexii')
// pluralize.plural('regex') //=> "regexii"

// // Example of new singular rule:
// pluralize.singular('singles') //=> "single"
// pluralize.addSingularRule(/singles$/i, 'singular')
// pluralize.singular('singles') //=> "singular"

// // Example of new irregular rule, e.g. "I" -> "we":
// pluralize.plural('irregular') //=> "irregulars"
// pluralize.addIrregularRule('irregular', 'regular')
// pluralize.plural('irregular') //=> "regular"

// // Example of uncountable rule (rules without singular/plural in context):
// pluralize.plural('paper') //=> "papers"
// pluralize.addUncountableRule('paper')
// pluralize.plural('paper') //=> "paper"

// // Example of asking whether a word looks singular or plural:
// pluralize.isPlural('test') //=> false
// pluralize.isSingular('test') //=> true

const pluralize = (word) => {
  return _pluralize.plural(word);
}

const singularize = (word) => {
  return Inflector.singularize(word);
}

const titleize = (sentence) => {
  return Inflector.titleize(sentence);
}

export { pluralize, singularize, titleize }