# Panel admina – co zrobić krok po kroku (localhost)

Żeby logować się na **knut666@wp.pl** z hasłem **Haslo123!** (lub dowolnym innym), zrób kolejno:

---

## Krok 1: Projekt Supabase

1. Wejdź na [supabase.com](https://supabase.com) i zaloguj się.
2. Utwórz nowy projekt (New project) – nazwa i hasło do bazy dowolne, zapisz je.
3. Po utworzeniu: w menu po lewej **SQL Editor** → **New query**.
4. Otwórz plik `supabase/schema.sql` z tego repozytorium, skopiuj całą zawartość, wklej do zapytania w Supabase i kliknij **Run**. Powinno być „Success”.

---

## Krok 2: Zmienne w .env

1. W folderze projektu (Wizytówka) skopiuj plik `.env.example` i zapisz jako `.env`.
2. W Supabase: **Project Settings** (ikona zębatki) → **API**.
3. Skopiuj:
   - **Project URL** → w `.env` jako wartość `VITE_SUPABASE_URL=`
   - **anon public** (klucz) → w `.env` jako wartość `VITE_SUPABASE_ANON_KEY=`
4. Zapisz `.env`. Przykład:
   ```env
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## Krok 3: (Opcja A) Rejestracja z poziomu strony

1. Uruchom projekt: w terminalu `npm run dev`.
2. Wejdź w przeglądarce na: **http://localhost:5173/admin/login** (albo 5174, jeśli Vite poda inny port).
3. Kliknij **„Zarejestruj konto admina”**.
4. Wpisz e-mail: **knut666@wp.pl**, hasło: **Haslo123!** (min. 6 znaków), kliknij **Zarejestruj**.
5. Jeśli Supabase ma włączone potwierdzenie e-mail: wejdź w skrzynkę, kliknij link. Potem wróć na `/admin/login` i zaloguj się tym samym e-mailem i hasłem.
6. Aby nie musieć potwierdzać maila: w Supabase → **Authentication** → **Providers** → **Email** → wyłącz **„Confirm email”** → Save. Wtedy po rejestracji od razu możesz się logować.

---

## Krok 3: (Opcja B) Konto utworzone w Supabase

1. W Supabase: **Authentication** → **Users** → **Add user** → **Create new user**.
2. E-mail: **knut666@wp.pl**, hasło: **Haslo123!** (zaznacz „Auto Confirm User” jeśli jest taka opcja).
3. Zapisz. Potem na stronie http://localhost:5173/admin/login wpisz ten e-mail i hasło i kliknij **Zaloguj**.

---

## Krok 4: Po zalogowaniu

- Zostaniesz przeniesiony na **http://localhost:5173/admin** (lub 5174).
- Stamtąd: **O mnie**, **Projekty**, **Pobieralnia**, **Strona główna** – edycja treści i zapis. Zmiany od razu widać na stronie głównej po odświeżeniu.

---

## Jeśli nadal jest „Failed to fetch”

- Sprawdź, czy w `.env` nie ma literówek w adresie i kluczu (bez spacji, cały klucz w jednej linii).
- Zrestartuj serwer deweloperski (Ctrl+C, potem `npm run dev`).
- W Supabase sprawdź, czy projekt nie jest w pauzie (Dashboard).
