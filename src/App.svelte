<style>
  main {
    max-width: 768px;
    margin: auto;
    margin-top: 24px;
  }

  .form > * {
    margin-bottom: 24px;
  }
</style>

<script>
  import axios from "axios";

  import Button from "./components/Button.svelte";
  import Section from "./components/Section.svelte";
  import { getRandom } from "./utils/range";

  import long from "./data/long.json";
  import short from "./data/short.json";

  let numberOfPairs = 2;

  let dices = [];
  let words = [];

  function generatePassword(e) {
    dices = Array.from({ length: numberOfPairs * 2 }, (_, index) => {
      return index % 2 === 0 ? getRandom(4) : getRandom(5);
    });

    words = dices.map((dice, index) => {
      return index % 2 === 0 ? short[dice] : long[dice];
    });
  }
</script>

<main class="main-content">
  <Section class="with-title">
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

    <div class="form">
      <div class="nes-field">
        <label for="number-of-paris">Gernate number of pairs words</label>
        <input
          class="nes-input {$$props.class}"
          id="number-of-pairs"
          bind:value="{numberOfPairs}"
        />
      </div>

      {#if dices.length > 0 && words.length > 0}
        <div class="nes-table-responsive">
          <table class="nes-table is-bordered is-centered">
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
      {/if}
    </div>

    <Button type="button" handleClick="{generatePassword}">
      Generate Password
    </Button>
  </Section>
</main>
