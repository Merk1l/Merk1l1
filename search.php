<?php
header('Content-Type: text/html; charset=UTF-8');

function normalize($s) {
    $s = mb_strtolower($s, 'UTF-8');
    $s = str_replace('ё', 'е', $s);
    return $s;
}

function getSortedLetters($word) {
    $chars = preg_split('//u', $word, -1, PREG_SPLIT_NO_EMPTY);
    sort($chars);
    return implode('', $chars);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$input = trim($_POST['letters']);
if (!preg_match('/^[а-яА-ЯёЁ]+$/', $input)) {
    die('<p style="color:red">Ошибка: введите только русские буквы.</p><a href="index.html">← Назад</a>');
}

$input = normalize($input);
$letters = preg_split('//u', $input, -1, PREG_SPLIT_NO_EMPTY);
$n = count($letters);

// Загружаем словарь (в память — OK для ≤100 тыс. слов)
$dict = array_map('trim', file('dict.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));
$dict = array_map('normalize', $dict);
$dict = array_flip($dict); // быстрая проверка: isset($dict[$word])

// Группируем слова по сортированной форме ("банка" → "аабкн")
$anagramGroups = [];
foreach (array_keys($dict) as $word) {
    $key = getSortedLetters($word);
    $anagramGroups[$key][] = $word;
}

// Ключ для поиска — отсортированные буквы ввода
$searchKey = getSortedLetters($input);

$results = $anagramGroups[$searchKey] ?? [];

// Дополнительно: ищем слова меньшей длины (необязательно, но полезно)
if (empty($results)) {
    $results = [];
    $inputSorted = str_split($input);
    sort($inputSorted);
    $inputSortedStr = implode('', $inputSorted);

    foreach (array_keys($dict) as $word) {
        if (mb_strlen($word) < 3) continue;
        if (mb_strlen($word) > $n) continue;

        $wordSorted = getSortedLetters($word);
        // Проверка: можно ли составить $word из $input?
        // Простой способ — multiset inclusion
        $need = count_chars($wordSorted, 1);
        $have = count_chars($inputSortedStr, 1);
        $ok = true;
        foreach ($need as $char => $cnt) {
            if (!isset($have[$char]) || $have[$char] < $cnt) {
                $ok = false;
                break;
            }
        }
        if ($ok) {
            $results[] = $word;
        }
    }
    $results = array_unique($results);
    sort($results);
}

echo "<h2>Анаграммы из букв «$input»:</h2>";
if ($results) {
    echo "<ul>";
    foreach ($results as $word) {
        echo "<li><strong>" . htmlspecialchars($word) . "</strong></li>";
    }
    echo "</ul>";
} else {
    echo "<p>Слов не найдено. Попробуйте другой набор букв.</p>";
}
echo "<br><a href='index.html'>← Вернуться</a>";
?>
