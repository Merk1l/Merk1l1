// script.js

function getPermutations(arr, len) {
  if (len === 1) return arr.map(x => [x]);

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = getPermutations(remaining, len - 1);
    for (let perm of perms) {
      result.push([current].concat(perm));
    }
  }
  return result;
}

function normalizeInput(s) {
  return s.trim().toLowerCase().replace(/ё/g, 'е').replace(/[^а-я]/g, '');
}

function findAnagrams() {
  const input = document.getElementById('input').value;
  const resultDiv = document.getElementById('result');

  const letters = normalizeInput(input).split('');
  if (letters.length < 3) {
    resultDiv.innerHTML = `<p class="error">Введите не менее 3 букв.</p>`;
    return;
  }

  const found = new Set();

  // Генерируем анаграммы длиной от 3 до N
  for (let len = 3; len <= letters.length; len++) {
    const perms = getPermutations(letters, len);
    for (const p of perms) {
      const word = p.join('');
      if (dictionary.includes(word)) {
        found.add(word);
      }
    }
  }

  if (found.size === 0) {
    resultDiv.innerHTML = `<p>Ничего не найдено 😕 Попробуйте другие буквы.</p>`;
  } else {
    const words = Array.from(found).sort();
    resultDiv.innerHTML = `
      <p><strong>Найдено ${words.length} слов:</strong></p>
      <ul>${words.map(w => `<li class="word">${w}</li>`).join('')}</ul>
    `;
  }
}

// Enter → поиск
document.getElementById('input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') findAnagrams();
});
