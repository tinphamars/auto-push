package main

import "fmt"

func main() {
	var a [5]int
	fmt.Println(a)
	a[4] = 100
	fmt.Println(a)
	a[3] = 300
	fmt.Println(a)
	fmt.Println("len of a: ", len(a))

	// Array in array
	var towD [2][3]int

	for k := 0; k < 2; k++ {
		for j := 0; j < 3; j++ {
			towD[k][j] = k + j + 1
		}
	}
	fmt.Println(towD)
	fmt.Println("================================================================")
	fmt.Println("SLICES")
	fmt.Println("================================================================")
	var s []string
	fmt.Println(len(s) == 0, s == nil)
	s = make([]string, 3)
	fmt.Println(s, len(s), cap(s))
	s[0] = "Tiny"
	s[1] = "Tomi"
	s[2] = "TynD"
	fmt.Println(s, len(s), cap(s))
	// Tao ra mot mang tu mot mang.
	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("array has name c: ", c)
	// Append no se tao ra mot mang tu mang cu1
	fmt.Println("array has name add sss to s : ", append(s, "sss"), s)
	// copi mang s tu vi tri thu 1 toi cuoi
	l := s[1:]
	// copi mang s tu vi tri thu 3 toi dau
	// l := s[:3]
	// copi mang s tu vi tri thu 1 toi vi tri thu 3
	// l := s[1:3]
	fmt.Println(s, l)

	haiD := make([][]int, 3)
	fmt.Println("first", haiD)
	for l := 0; l < 3; l++ {
		innerLen := l + 1
		haiD[l] = make([]int, innerLen)
		for t := 0; t < innerLen; t++ {
			haiD[l][t] = l + t
		}
	}
	fmt.Println(haiD)

	fmt.Println("================================================================")
	fmt.Println("MAP")
	fmt.Println("================================================================")
	m := make(map[string]int)
	m["k1"] = 10
	m["k2"] = 11
	m["k3"] = 11
	fmt.Println(m)
	delete(m, "k3")
	fmt.Println("delete k3", m)
	// Kiem tra xe key "k2" co ton tai trong map M khong? ( return true or false )
	_, err := m["k2"]
	fmt.Println("delete k3", err)

	message := map[string]int{"John": 30, "Jane": 25, "Mike": 35}
	for index, value := range message {
		fmt.Printf("Index: %d, Value: %c\n", index, value)
	}
}
