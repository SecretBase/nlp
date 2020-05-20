<style>
  main {
    max-width: 768px;
    margin: auto;
    margin-top: 24px;
  }

  .form > * {
    margin-bottom: 24px;
  }

  .table-wrapper {
    margin-top: 24px;
  }

  .table {
    margin-bottom: 24px;
  }

  .table:before {
    content: none;
  }
</style>

<script>
  import { onMount } from "svelte";

  import Button from "./components/Button.svelte";
  import Section from "./components/Section.svelte";
  import { getRandom } from "./utils/range";
  import { classnames } from "./utils/classnames";

  import long from "./data/long.json";
  import short from "./data/short.json";

  let numberOfPairs = 2;
  let copyTimeout;

  let dices = [];
  let words = [];
  let darkMode = "";

  const supportClipboard = Boolean(window.navigator.clipboard);

  function generatePassword() {
    dices = Array.from({ length: numberOfPairs * 2 }, (_, index) => {
      return index % 2 === 0 ? getRandom(4) : getRandom(5);
    });

    words = dices.map((dice, index) => {
      return index % 2 === 0 ? short[dice] : long[dice];
    });
  }

  function setDarkMode(isDarkMode) {
    darkMode = isDarkMode.matches ? "is-dark" : "";
  }

  onMount(() => {
    generatePassword();
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(isDarkMode);

    isDarkMode.addListener(setDarkMode);

    return () => {
      isDarkMode.removeListener(setDarkMode);
    };
  });

  function onSubmit(e) {
    e.preventDefault();
    generatePassword();
  }

  function copyToClipboard(e) {
    e.preventDefault();
    clearTimeout(copyTimeout);
    navigator.clipboard.writeText(words.join(" ")).then(() => {
      e.target.innerText = "Copied!!";
      copyTimeout = setTimeout(() => {
        e.target.innerText = "Copy";
      }, 1500);
    });
  }
</script>

<main>
  <Section class="{classnames('with-title', darkMode)}">
    <h3 class="title">Generate password</h3>

    <p>Long and short lists used:</p>

    <ul>
      <li>
        <a
          href="https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          EFF's Long Wordlist [.txt]
        </a>
      </li>
      <li>
        <a
          href="https://www.eff.org/files/2016/09/08/eff_short_wordlist_1.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          EFF's Short Wordlist #1 [.txt]
        </a>
      </li>
    </ul>

    <form class="form" on:submit="{onSubmit}">
      <div class="nes-field">
        <label for="number-of-paris">number of pair words in password</label>
        <input
          class="{classnames('nes-input', darkMode)}"
          id="number-of-pairs"
          bind:value="{numberOfPairs}"
        />
      </div>

      <Button type="submit" handleClick="{onSubmit}">Generate Password</Button>
    </form>

    {#if dices.length > 0 && words.length > 0}
      <div class="nes-table-responsive table-wrapper">
        <table class="nes-table is-bordered is-centered table {darkMode}">
          <thead>
            <tr>
              {#each dices as dice}
                <th>{dice}</th>
              {/each}
            </tr>
          </thead>
          <tbody>
            <tr>
              {#each words as word}
                <td>{word}</td>
              {/each}
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <span class="nes-icon is-small star"></span>
        <strong>space will be inserted between words</strong>
      </p>
      {#if supportClipboard}
        <Button type="type" handleClick="{copyToClipboard}">Copy</Button>
      {/if}
    {/if}
  </Section>
</main>
